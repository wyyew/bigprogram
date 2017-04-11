import React from 'react';
import { Route, IndexRoute } from 'react-router';
// import { Main, Home, AppRoot, NotFound } from './containers'; //, Forms, Statistic, Login
import AppRoot from './containers/Counter/counter';
import Home from './containers/Home/home';
import Main from './containers/Main/Main';
import NotFound from './containers/notfound';
import { set } from './actions';
// import { laodStatistic } from './actions/statistic';
// import { loadAuthIfNeeded } from './actions/auth';

const preload = promise => (nextState, replace, cb) => {
  if( __SERVER__ || nextState.location.action === 'PUSH') {
    promise().then(() => cb());
  } else {
    cb();
  }
};

export default store => {
  const counterPromise = () => store.dispatch(set(0));
  return(
    <Route path="/" component={Main}>
      <IndexRoute component={Home} />
      <Route path="counter" component={Counter} onEnter={preload(counterPromise)} />
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
