import React from 'react';

const useStyles = (props: any) => ({
  container: {
    position: 'relative'
  }  as React.CSSProperties,

  loader: {
    width: props.size,
    height: props.size,
    borderRadius: '50%',
    border: `${props.stroke}px solid transparent`,
    borderLeftColor: props.color,
    borderLeftWidth: props.stroke,
    borderRightColor: props.color,
    borderRightWidth: props.stroke,
  } as React.CSSProperties
})

const Loader = (props: any) => {
  const styles = useStyles(props);

  return (
      <div style={styles.loader}
           className='loader'></div>
  );
};  

export default Loader;