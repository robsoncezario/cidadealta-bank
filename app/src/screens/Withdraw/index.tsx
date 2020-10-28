import React, {useState} from 'react';
import { 
  Typography,
  TextField,
  withStyles
} from '@material-ui/core';
import NumberFormat from 'react-number-format';
import { useRecoilState } from 'recoil';
import * as atoms from '../../navigation/atoms';
import SubmitButtonWithSelector from '../../components/SubmitButtonWithSelector';
import { BankService } from '../../services/service';

const styles = {
  container: {
    width: '100%',
    height: '65vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  } as React.CSSProperties,

  buttonContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    boxSizing: 'border-box',
    padding: '1vh'
  } as React.CSSProperties,

  icon: {
    width: '3vh',
    height: '3vh'
  } as React.CSSProperties,

  withDescription: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column'
  } as React.CSSProperties,

  wrapper: {
    marginTop: '1vh',
    width: '30vw'
  } as React.CSSProperties
}

interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

function NumberFormatCustom(props: NumberFormatCustomProps) {
  const {inputRef, onChange, ...other} = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}

const WithdrawScreen = () => {
  const [data, setAccount] = useRecoilState(atoms.navigationAtom);
  const [amount, setAmount] = useState(data.account.bankMoney.toString());

  const isDisabled = !(data.account.bankMoney >= parseInt(amount) &&   
                     parseInt(amount) >= 1);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value as string);
  };

  const handleWithdraw = () => {
    const value = parseInt(amount);

    setAccount(prevState => ({ 
      ...prevState,
      account: {
        ...prevState.account, 
        ...{
          bankMoney: data.account.bankMoney - value,
          money: data.account.money + value
        }
      },
      isAsyncRequesting: true
    }));

    async function withdraw() {
      await BankService.withdraw(data.account.id, value);

      setAccount(prevState => ({ 
        ...prevState,
        isAsyncRequesting: false
      }));
    }

    withdraw();
  }

  return (
    <div style={styles.container}>
      <div style={styles.buttonContainer}>
        <div style={styles.withDescription}>
          <Typography 
            variant='subtitle2' 
            component='div'>
            Quanto você gostaria de sacar?
          </Typography>

          <Typography 
            variant='body2' 
            component='div'>
            Você tem {new Intl.NumberFormat('en-US', { 
              style: 'currency', 
              currency: 'USD'
            }).format(data.account.bankMoney)} disponível
          </Typography>

          <TextField
            label=""
            value={amount}
            onChange={handleChange}
            autoFocus={true}
            InputProps={{
              inputComponent: NumberFormatCustom as any,
            }}
          />
        </div>
      </div>  

      <div style={styles.wrapper}>
        <SubmitButtonWithSelector
          label='Sacar ➝'
          isDisabled={isDisabled}
          onClick={handleWithdraw}
          fullWidth={true} />
      </div>
    </div>
  );
}

export default WithdrawScreen;