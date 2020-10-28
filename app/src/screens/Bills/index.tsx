import React, {
  useState, 
  useEffect
} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import { 
  TextField,
  Typography
} from "@material-ui/core";

import { 
  DateRangePicker, 
  DateRange, 
  LocalizationProvider 
} from "@material-ui/pickers";
import DateFnsUtils from "@material-ui/pickers/adapter/date-fns"; 
import ptbrLocale from "date-fns/locale/pt-BR";

import { useRecoilState } from 'recoil';
import * as atoms from '../../navigation/atoms';
import { BankService } from '../../services/service';
import { Balance } from '../../models/Balance';
import Loader from '../../components/Loader';
import { User } from '../../models/User';


const styles = {
  container: {
    width: '100%',
    height: '65vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column'
  } as React.CSSProperties,

  pickerContainer: {
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    padding: '1vh'
  } as React.CSSProperties,

  table: {
    marginTop: '5vh'
  } as React.CSSProperties,

  dateContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  } as React.CSSProperties,

  dateSpacer: {
    marginLeft: '.5vh',
    marginRight: '.5vh',
    whiteSpace: 'nowrap'
  } as React.CSSProperties
};

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    height: '50vh',
  },
});

const columns: any[] = [
  { 
    id: 'amount', 
    label: 'Quantia', 
    minWidth: '15vw',
    format: (value: number) => new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD'
    }).format(value)
  },

  {
    id: 'target', 
    label: 'Para quem', 
    minWidth: '20vw',
    format: (value: any) => {
      if(value === null || value === undefined) {
        return '';
      }

      return value.name;
    }
  },
  {
    id: 'type', 
    label: 'Tipo', 
    minWidth: '10vw',
    format: (value: number) => {
      switch(value) {
        case 1: 
          return 'Depósito';
        case 2: 
          return 'Saque';
        case 3: 
          return 'Envio';
        case 4: 
          return 'Recebido';
      }
    }
  },

  { 
    id: 'createdAt', 
    label: 'Quando', 
    minWidth: '15vw',
    format: (value: string) => {
      const date = new Date(value);

      return new Intl.DateTimeFormat('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      }).format(date)
        .replaceAll('.','');
    }
  },
];

interface IResponse {
  isAsyncRequesting: boolean;
  pageData?: IPage;
}

interface IPage {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  itemList: Array<Balance>;
}

const BillsScreen = () => {
  const [{account}, setAccount] = useRecoilState(atoms.navigationAtom);
  const [data, setData] = useState<IResponse | null>({
    pageData: undefined,
    isAsyncRequesting: true
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedDate, handleDateChange] = React.useState<DateRange>([null, null]);

  const onPageChange = () => {
    async function receiptSubscriber() {
      if(!data?.isAsyncRequesting) {
        setData(prevState => ({ 
          ...prevState,
          isAsyncRequesting: true 
        }));
      }

      const pageData = await BankService.getBalance(account.id, page, rowsPerPage, selectedDate);

      setData({
        pageData: pageData,
        isAsyncRequesting: false 
      });
    }

    receiptSubscriber();
  }

  useEffect(onPageChange, [page, rowsPerPage, selectedDate]);

  const classes = useStyles();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div style={styles.container}>
      <div style={styles.pickerContainer}>
        <LocalizationProvider dateAdapter={DateFnsUtils} locale={ptbrLocale}>
          <DateRangePicker
            startText="Entre"
            endText="Até"
            value={selectedDate}
            onChange={date => handleDateChange(date)}
            renderInput={(startProps, endProps) => (
              <div style={styles.dateContainer}>
                <Typography 
                  variant='body2' 
                  component='div'
                  style={styles.dateSpacer}>
                  Filtrar por data
                </Typography>

                <TextField {...startProps} />
                <Typography 
                  variant='body2' 
                  component='div'
                  style={styles.dateSpacer}>
                  até
                </Typography>

                <TextField {...endProps} />
              </div>
            )}
          />
        </LocalizationProvider>
      </div>  

      <div style={styles.table}>
        {data!.isAsyncRequesting === true && (
          <Loader stroke={1}
            size={15}
            color={'rgb(255, 178, 33)'} /> 
        )}

        {data!.isAsyncRequesting === false && (
          <>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{minWidth: column.minWidth}}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(data?.pageData?.itemList ?? []).map((row) => {
                    return (
                      <TableRow hover key={row.id}>
                        {columns.map((column) => {
                          const value = (row as any)[column.id];

                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && value ? column.format(value) : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
   
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={data?.pageData?.totalItems ?? 0}
              rowsPerPage={rowsPerPage}
              page={page}
              labelRowsPerPage='Linhas por página'
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </>
        )}

      </div>
    </div>
  );
}

export default BillsScreen;