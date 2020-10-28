import React from 'react';
import { 
  Button,
  makeStyles
} from '@material-ui/core';
import Loader from '../Loader';

import * as atoms from '../../navigation/atoms';
import { useRecoilValue } from 'recoil';

const SubmitButtonWithSelector = (props: any) => {
  const {isAsyncRequesting} = useRecoilValue(atoms.navigationAtom);

  return (
    <Button onClick={props?.onClick}   
            variant='contained'
            disabled={props.isDisabled === true || isAsyncRequesting === true}
            fullWidth={props?.fullWidth}
            style={props?.style}>
      {isAsyncRequesting && (
        <Loader stroke={1}
                size={10}
                color={'#bfbfb1'} />
      )}
      {props.label}
    </Button>
  );
}

export default SubmitButtonWithSelector;