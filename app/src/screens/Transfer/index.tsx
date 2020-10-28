import React, {useState} from 'react';
import { 
  Typography,
  TextField
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

const TransferScreen = () => {
  const [data, setAccount] = useRecoilState(atoms.navigationAtom);
  const [amount, setAmount] = useState(data.account.bankMoney.toString());
  const [playerId, setPlayerId] = useState<string | null>(null);

  const isDisabled = !(data.account.bankMoney >= parseInt(amount) &&   
                     parseInt(amount) >= 1) ||
                     !playerId ||
                     parseInt(playerId) === data.account.id ||
                     (parseInt(playerId as string) > 10000) ||
                     (parseInt(playerId as string) < 1);

  const handleChangePlayerId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerId(event.target.value as string);
  };

  const handleOnInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value = (event.target.value || ' ').replace(/\D+/g, '').trim()
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value as string);
  };

  const handleTransfer = () => {
    const value = parseInt(amount);

    setAccount(prevState => ({ 
      ...prevState,
      account: {
        ...prevState.account, 
        ...{
          bankMoney: data.account.bankMoney - value
        }
      },
      isAsyncRequesting: true
    }));

    async function transfer() {
      const result = await BankService.transfer(data.account.id, parseInt(playerId as string), value);

      console.log(result);

      if(result.status === 400) {
        setAccount(prevState => ({ 
          ...prevState,
          account: {
            ...prevState.account, 
            ...{
              bankMoney: data.account.bankMoney
            }
          },
          isAsyncRequesting: false
        }));
      } else {
        setAccount(prevState => ({ 
          ...prevState,
          isAsyncRequesting: false
        }));
      }
    }

    transfer();
  }

  return (
    <div style={styles.container}>
      <div style={styles.buttonContainer}>
        <div style={styles.withDescription}>
          <Typography 
            variant='subtitle2' 
            component='div'>
            Para quem gostaria de transferir?
          </Typography>

          <TextField
            label="ID do personagem"
            value={playerId}
            onChange={handleChangePlayerId}
            onInput={handleOnInput}
            autoFocus={true}
          />

          <Typography 
            variant='subtitle2' 
            component='div'>
            Quanto você gostaria de transferir?
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
            InputProps={{
              inputComponent: NumberFormatCustom as any,
            }}
          />
        </div>
      </div>  

      <div style={styles.wrapper}>
        <SubmitButtonWithSelector
          label='Transferir ➝'
          isDisabled={isDisabled}
          onClick={handleTransfer}
          fullWidth={true} />
      </div>
    </div>
  );
}

export default TransferScreen;