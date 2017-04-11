require('babel-polyfill');
var React = require( 'react')
var ReactDom = require( 'react-dom')
var Provider = require( 'react-redux')
var { Roter, browserHistory } = require( 'react-router')

var  configureStore = require( '../utils/configureStore');
var getRoutes = require('../routes');

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);
const rootElement = document.getElementById('app');
const routes = getRoutes(store);
const history = browserHistory;
console.log('aa');

ReactDom.render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  rootElement
)
