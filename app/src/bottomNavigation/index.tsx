import React, { useEffect } from 'react';
import ActionButton from '../components/ActionButton';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '65vh'
  } as React.CSSProperties,

  wrapper: {
    marginLeft: '1vh'
  } as React.CSSProperties
}

const BottomNavigation = () => {
  const buttonList = [
  {
    name: 'Inicío',
    icon: 'home.svg'
  },

  {
    name: 'Transferencia',
    icon: 'transfer.svg'
  },

  {
    name: 'Depositar',
    icon: 'deposit.svg'
  },

  {
    name: 'Sacar',
    icon: 'withdraw.svg'
  },

  {
    name: 'Extrato',
    icon: 'bill.svg'
  }];
  

  return (
    <div style={styles.container}>
      {buttonList.map((b, index) => (
        <>
          {index === 1 &&
            <ActionButton
              name={b.name}
              icon={b.icon}
              index={index} />
          }

          {index > 1 &&
            <div style={styles.wrapper}>
              <ActionButton
                name={b.name}
                icon={b.icon}
                index={index} />
            </div>
          }
        </>
      ))}
    </div>
  )
}

export default BottomNavigation;