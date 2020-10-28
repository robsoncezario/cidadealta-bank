import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import HomeScreen from '../screens/Home';
import { BankService } from '../services/service';

import * as atoms from './atoms';

const Navigation = () => {
  const [navigation, setNavigation] = useRecoilState(atoms.navigationAtom);

  const fetchDetails = () => {
    async function receiptSubscriber() {
      const result = await BankService.getDetails(1);

      setNavigation(prevState => ({ 
        ...prevState,
        account: result
      })); 
    }

    receiptSubscriber();
  }

  useEffect(fetchDetails, []);

  switch(navigation.index) {
    case 0: 
      return (<HomeScreen />);
    default: 
      return (<></>);
  }
}

export default Navigation;