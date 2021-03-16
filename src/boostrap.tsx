import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import  Loader from './shared/widgets/loader';
import  {AuthRoute} from "./authRoute";

const AppHome = lazy(() =>
  import('./appHome')
    .then(({ AppHome }) => ({ default: AppHome }))
);

const LandingPage = lazy(() =>
  import('./auth/landing')
    .then(({ LandingPage }) => ({ default: LandingPage }))
);


export default function mainContents() {
 
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {/* <Route exact path='/'>
          <Redirect to='/'/>
        </Route> */}
        <Route path={`/landing`} component={LandingPage} />
        {/* <Route path={`/login`} component={Login} /> */}
        <AuthRoute component={AppHome} />
      </Switch>
    </Suspense>
  );
}
