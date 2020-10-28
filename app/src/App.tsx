import React from 'react';

import { MuiThemeProvider } from '@material-ui/core/styles';
import { RecoilRoot } from 'recoil';

import dark from './theme/dark';
import Navigation from './navigation/navigation';

const App = () => {
  return (
    <RecoilRoot>
      <MuiThemeProvider theme={dark}>
        <Navigation />
      </MuiThemeProvider>
    </RecoilRoot>
  );
}

export default App;
