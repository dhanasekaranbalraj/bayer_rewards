import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import  Loader from './shared/widgets/loader';
import  {AuthRoute} from "./authRoute";
import { clearLocalStorageData } from './base/localStore';
import Cookies from 'js-cookie';

const AppHome = lazy(() =>
  import('./appHome')
    .then(({ AppHome }) => ({ default: AppHome }))
);

const LandingPage = lazy(() =>
  import('./auth/landing')
    .then(({ LandingPage }) => ({ default: LandingPage }))
);

const getLData = localStorage.getItem('userData');
const getCData = Cookies.get('userData');
console.log(getCData, 'getCData f');

  let isLoggedIn = false;
  if(getCData){
    isLoggedIn = JSON.parse(getCData).isRemember;
  }
  if(!isLoggedIn && !getLData){
    Cookies.remove('userData');
    clearLocalStorageData('userData');
  }

export default function mainContents() {
 
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route path={`/landing`} component={LandingPage} />
        {/* <Route path={`/login`} component={Login} /> */}
        <AuthRoute component={AppHome} />
      </Switch>
    </Suspense>
  );
}
