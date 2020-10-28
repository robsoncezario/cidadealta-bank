import React from 'react';
import { 
  Paper,
  Typography 
} from '@material-ui/core';
import { useRecoilValue } from 'recoil';

import Header from '../../components/Header';
import BottomNavigation from '../../bottomNavigation';

import * as atoms from '../../bottomNavigation/atoms';
import WithdrawScreen from '../Withdraw';
import DepositScreen from '../Deposit';
import TransferScreen from '../Transfer';
import BillsScreen from '../Bills';

const styles = {
  wrapper: {
    position: 'absolute', 
    left: '50%', 
    top: '50%',
    transform: 'translate(-50%, -50%)'
  } as React.CSSProperties,

  spacer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '3vh'
  } as React.CSSProperties,

  container: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: '70vw',
    padding: '2vh'
  } as React.CSSProperties
}

const HomeScreen = () => {
  const {index} = useRecoilValue(atoms.bottomNavigationAtom);

  const NavigationController = () => {
    switch(index) {
      case 0: 
        return (<BottomNavigation />);
      case 1:
        return (<TransferScreen />)
      case 2: 
        return (<DepositScreen />);
      case 3: 
        return (<WithdrawScreen />);
      case 4: 
        return (<BillsScreen />)
      default: 
        return (<></>);
    }
  }

  return (
    <div style={styles.wrapper}>
      <Paper style={styles.container}>
        <Header />

        <div style={styles.spacer}>
          <NavigationController />
        </div>
      </Paper>
    </div>
  );
}

export default HomeScreen;