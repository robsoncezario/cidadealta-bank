import React, {useEffect, useState} from 'react';
import { 
  Button,
  Typography,
  withStyles
} from '@material-ui/core';
import { useRecoilState } from 'recoil';
import * as atoms from '../../bottomNavigation/atoms';

const styles = {
  container: {
    position: 'relative',
    width: '100%',
    height: '10vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    boxSizing: 'border-box',
    padding: '1vh'
  } as React.CSSProperties,

  icon: {
    width: '6vh',
    height: '6vh'
  } as React.CSSProperties,

  endAligner: {
    marginTop: 'auto'
  } as React.CSSProperties,

  dark: {
    filter: 'brightness(0)'
  } as React.CSSProperties
}

const TheButton = withStyles({
  root: {
    minWidth: '12.5vh',
    maxWidth: '12.5vh',
    width: '12.5vh  !important',
    height: '12.5vh !important',
    padding: '0 !important',
    borderRadius: '50% !important',
    border: 'none !important',
    backgroundColor: '#ffe7bb'
  },

  label: {
    color: 'black !important',
    fontWeight: 'bold',

    '&:hover': {
      color: 'black !important'
    }
  }
})(Button);

const HoveredButton = withStyles({
  root: {
    minWidth: '12.5vh',
    maxWidth: '12.5vh',
    width: '12.5vh  !important',
    height: '12.5vh !important',
    padding: '0 !important',
    borderRadius: '50% !important',
    border: 'none !important',
    backgroundColor: 'rgb(255, 178, 33)'
  }
})(Button);

const ActionButton = (props: any) => {
  const [navigation, setNavigation] = useRecoilState(atoms.bottomNavigationAtom);
  const [isHover, setHover] = useState<boolean>(false);

  const handleTabIndex = () => {
    setNavigation(prevState => ({ 
      ...prevState,
      index: props.index
    })); 
    setHover(false);
  };

  const handleOnMouseEnter = () => {
    setHover(true);
  };

  const handleOnMouseLeave = () => {
    setHover(false);
  };

  return (
    <>
      {navigation.index === props.index && (
        <HoveredButton 
            onClick={handleTabIndex}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
            variant='contained'
            color='primary'>
          <div style={styles.container}>
            <img style={{...styles.icon, ...styles.dark}} 
                src={process.env.PUBLIC_URL + '/media/ui/' + props.icon} /> 

            <Typography 
              variant='body2' 
              component='div'
              style={{...styles.endAligner, ...styles.dark}}>
              {props.name}
            </Typography>
          </div>  
        </HoveredButton>
      )}

      {navigation.index !== props.index && (
        <TheButton 
            onClick={handleTabIndex}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
            variant='contained'
            color='primary'>
          <div style={styles.container}>
            <img style={isHover ? {...styles.icon, ...styles.dark} : styles.icon} 
                src={process.env.PUBLIC_URL + '/media/ui/' + props.icon} /> 

            <Typography 
              variant='body2' 
              component='div'
              style={isHover ? {...styles.endAligner, ...styles.dark} : styles.endAligner}>
              {props.name}
            </Typography>
          </div>  
        </TheButton>
      )}
    </>
  );
}

export default ActionButton;