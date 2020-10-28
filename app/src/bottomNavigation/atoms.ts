import {atom} from 'recoil';

export const bottomNavigationAtom = atom({
  key: 'bottomNavigationAtom',
  default: {
    index: 0
  } 
});