import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { HydraAdmin } from '@api-platform/admin';
import { Resource } from 'react-admin';
import { CustomLayout } from './components/Layout';
import { createMuiTheme } from '@material-ui/core/styles';
import { UrlEdit, UrlList } from './components/Url';

const primaryColor = '#030F40';
const primary = {
  light: primaryColor,
  main: primaryColor,
  dark: primaryColor,
  contrastText: '#fff',
};

ReactDOM.render(
  <HydraAdmin
    {...{
      entrypoint: 'http://api.domain.com',
      layout: CustomLayout,
      theme: createMuiTheme({
        overrides: {
          MuiAppBar: {
            colorSecondary: {
              backgroundColor: primaryColor,
            },
          },
          MuiDrawer: {
            root: {
              display: 'none',
            },
            docked: {
              display: 'none',
            }
          },
        },
        palette: {
          primary,
        },
      })
    }}>
    <Resource name='urls' edit={UrlEdit} list={UrlList}/>
  </HydraAdmin>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
