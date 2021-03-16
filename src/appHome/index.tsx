// import React, { lazy, Suspense, useState } from 'react';
// import { Route, Switch, Redirect, useRouteMatch, useHistory } from 'react-router-dom';
// // import styles from './appHome.module.scss';

// const Dashboard = lazy(() =>
//   import('../shared/components/dashboard')
//     .then(({ Dashboard }) => ({ default: Dashboard }))
// );

// // const Contacts = lazy(() =>
// //   import('../scanLogs')
// //     .then(({ ScanLogs }) => ({ default: ScanLogs }))
// // );

  
// function AppHome() {
//   const { path } = useRouteMatch();
//   const history = useHistory();

//   const [isExpanded, setIsExpanded] = useState(false);

//   const toggleCollapsed = (data: any) => {
//     setIsExpanded(data);
//   };
//   const onChangeMenu = (menu: any, keyVal: any) => {
//     history.push({
//       pathname: `${path}/${menu}`,
//       state: { activeMenu: keyVal}
//     });
//   };
//   return (
    
//     <Suspense fallback={<p>...</p>}>
//       <Switch>
//         <Route exact path={`/`}>
//           <Redirect to={`/dashboard`} />
//         </Route>
//         <Route path={`/dashboard`} component={Dashboard} />
//         {/* <Route path={`${path}/createUser`} component={Dashboard} /> */}
//         {/* <Route path={`${path}/userList`} component={Contacts} /> */}
//         {/* <Route path='*' render={() => <Error404 />} /> */}
//       </Switch>
//     </Suspense>
      
//   );
// };

// export { AppHome };



import React, {Component, lazy, Suspense } from 'react';
import { Route, Switch, Redirect, useRouteMatch, useHistory, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import AUX from '../hoc/Aux_';
import TopBar from '../shared/components/Layout/TopBar';
import SideBar from '../shared/components/Layout/SideBar';

const Dashboard = lazy(() =>
  import('../shared/components/dashboard')
    .then(({ Dashboard }) => ({ default: Dashboard }))
);

class MyApp extends Component<any, any> {
  constructor(props: any){
    super(props)
    this.state = {
      path: this.props.match.path
    }
    console.log(this.props.location.pathname, 'propsss');
  }

  render() {
    return (
      <AUX>
        <div id="wrapper">
            <TopBar  {...this.props} />
            <SideBar />
            <div className="content-page">
              <div className="content">
                  <Suspense fallback={<p>...</p>}>
                    <Switch>
                      <Route exact path={`/`}>
                        <Redirect to={`/dashboard`} />
                      </Route>
                      <Route path={`/dashboard`} component={Dashboard} />
                      {/* <Route path={`${path}/createUser`} component={Dashboard} /> */}
                      {/* <Route path={`${path}/userList`} component={Contacts} /> */}
                      {/* <Route path='*' render={() => <Error404 />} /> */}
                    </Switch>
                  </Suspense>
              </div>
            </div>
        </div>
      </AUX> 
    );
  }
}
const mapStatetoProps = (state: any) => {
  return {
    topbar: state.ui_red.topbar,
    footer: state.ui_red.footer,
    sidebar: state.ui_red.sidebar,
    loginpage: state.ui_red.loginpage
  };
}
const AppHome = withRouter(connect(mapStatetoProps)(MyApp));

export { AppHome };



