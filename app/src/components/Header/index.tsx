import React, {useEffect} from 'react';
import { 
  Button,
  Typography,
  withStyles
} from '@material-ui/core';
import { useRecoilState } from 'recoil';
import * as atoms from '../../navigation/atoms';

import * as bottomAtoms from '../../bottomNavigation/atoms';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  } as React.CSSProperties,

  bank: {
    width: '7.5vh',
    height: '7.5vh'
  } as React.CSSProperties,

  moneyContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  } as React.CSSProperties,

  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    width: '2vh',
    height: '2vh'
  } as React.CSSProperties,

  spacer: {
    marginTop: '-1vh'
  } as React.CSSProperties,

  amount: {
  } as React.CSSProperties,

  money: {
    color: '#9f9f91 !important'
  } as React.CSSProperties,

  chevron: {
    marginTop: '-1.5vh',
    fontSize: '2vh'
  } as React.CSSProperties,

  button: {
    width: '3vh  !important',
    height: '3vh !important',
    padding: '0 !important'
  } as React.CSSProperties
}

const LogoutButton = withStyles({
  root: {
    minWidth: '4vh',
    maxWidth: '4vh',
    width: '4vh  !important',
    height: '4vh !important',
    padding: '0 !important',
    borderRadius: '50% !important',
    border: 'none !important',
    backgroundColor: 'rgb(255, 178, 33)',
    color: '#333'
  },

  label: {
    color: '#333',
    '&:hover': {
      color: 'black !important'
    }
  }
})(Button);

const Header = () => {
  const [navigation, setNavigation] = useRecoilState(atoms.navigationAtom);
  const [bottomNavigation, setBottomNavigation] = useRecoilState(bottomAtoms.bottomNavigationAtom);

  const handleClose = () => {
    //document.onkeydown = null;
    if(bottomNavigation.index === 0) {
      setNavigation(prevState => ({ 
        ...prevState,
        index: -1
      })); 
    } else {
      setBottomNavigation(prevState => ({ 
        ...prevState,
        index: 0
      })); 
    }
  };

  const keyDown = (event: any) => {
    if(event.keyCode === 27 || event.keyCode === 69) {
      //handleClose();
    }
  }

  const handleKeyPress = () => {
    document.onkeydown = keyDown;
  }

  useEffect(handleKeyPress, []);

  return (
    <div style={styles.container}>
      <img style={styles.bank} 
            src={process.env.PUBLIC_URL + '/media/ui/cda.png'} />

      <div style={styles.moneyContainer}>
        <Typography 
          variant='body2' 
          component='div'>
            Olá, {navigation.account.name}
        </Typography>

        <Typography 
          variant='caption' 
          component='div'>
            Dinheiro da carteira {new Intl.NumberFormat('en-US', { 
              style: 'currency', 
              currency: 'USD'
            }).format(navigation.account.money)}
        </Typography>

        <Typography 
          variant='caption' 
          component='div'
          style={styles.spacer}>
            Saldo bancário {new Intl.NumberFormat('en-US', { 
              style: 'currency', 
              currency: 'USD'
            }).format(navigation.account.bankMoney)}
        </Typography>
      </div>

      <LogoutButton onClick={handleClose}
            variant='contained'
            color='primary'> {bottomNavigation.index === 0 ? '✖' : '🡨'}
      </LogoutButton>
    </div>
  );
}

export default Header;