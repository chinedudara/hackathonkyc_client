import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import login from './pages/login';
import signup from './pages/signup';
import home from './pages/home';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#00dbff',
			main: '#10A5F5',
			dark: '#0859c6',
			contrastText: '#fff'
		},
		secondary: {
			light: '#f6f6f6',
			main: '#BDBDBD',
			dark: '#f6f6f6',
			contrastText: '#fff'
    },
		success: {
			light: '#00cc00',
			main: '#00b300',
			dark: '#008000',
			contrastText: '#fff'
    },
    aux: {
      enabled: '#BDBDBD',
      main: '#f6f6f6'
    }
	}
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
        <Router>
            <div>
              <Switch>
                <Route exact path="/" component={home}/>
                <Route exact path="/login" component={login}/>
                <Route exact path="/signup" component={signup}/>
              </Switch>
            </div>
        </Router>
    </MuiThemeProvider>
  );
}

export default App;
