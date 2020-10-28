import {atom, selector} from 'recoil';

export const navigationAtom = atom({
  key: 'navigationAtom',
  default: {
    index: 0,
    account: {
      id: 1,
      name: 'Robson Cezario',
      bankMoney: 7000,
      money: 500
    },
    withdrawInput: 0,
    isAsyncRequesting: false
  } 
});