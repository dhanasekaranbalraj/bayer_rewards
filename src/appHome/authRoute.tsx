import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';


function AuthouteProps({ component: Component, ...rest }:any) {
  const isLoggedIn =false;
  const history = useHistory();
  return (
    <Route {...rest}
      render={() => (isLoggedIn ? <Component history={history}/>
        : <Redirect to="app/login" />)}
    />
  );
}

export default AuthouteProps;
