import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Alert } from '@material-ui/lab';

import { history } from "../utils";
import { alertActions } from '../actions';
import { ManageEmails, ComposeEmail, Login, Register } from '../pages';
import { RootState } from '../reducers';
import { TopBar } from '../components';

export function App() {
  const alert = useSelector((state: RootState) => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location, action) => {
      dispatch(alertActions.clear());
    });
  }, []);

  return (
    <div className="App">
      <Router history={history}>
        <TopBar />
        {alert.message &&
          <Alert severity={alert.type}>{alert.message.toString()}</Alert>
        }
        <Switch>
          <Route exact path="/" component={ManageEmails} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/compose-email" component={ComposeEmail} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </div>
  );
}
