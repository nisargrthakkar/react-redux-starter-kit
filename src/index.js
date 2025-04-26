import App from './modules/App';
import React from 'react'; //eslint-disable-line
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './redux/store';
import './css/style.css';
//No Comment Lines

//REmove this line commment

//<H1>Hello</h1>



const target = document.querySelector('#root');
const test = '';
const test1 = '';

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  target
);


//REmove it ----