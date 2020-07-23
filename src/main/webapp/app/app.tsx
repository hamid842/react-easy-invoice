// import 'react-toastify/dist/ReactToastify.css';
// import './app.scss';

// import React, { useEffect } from 'react';
// import { connect } from 'react-redux';
// import { Card } from 'reactstrap';
// import { BrowserRouter as Router } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import { hot } from 'react-hot-loader';

// import { IRootState } from 'app/shared/reducers';
// import { getSession } from 'app/shared/reducers/authentication';
// import { getProfile } from 'app/shared/reducers/application-profile';
// import Header from 'app/shared/layout/header/header';
// import Footer from 'app/shared/layout/footer/footer';
// import { hasAnyAuthority } from 'app/shared/auth/private-route';
// import ErrorBoundary from 'app/shared/error/error-boundary';
// import { AUTHORITIES } from 'app/config/constants';
// import AppRoutes from 'app/routes';

// const baseHref = document
//   .querySelector('base')
//   .getAttribute('href')
//   .replace(/\/$/, '');

// export interface IAppProps extends StateProps, DispatchProps {}

// export const App = (props: IAppProps) => {
//   useEffect(() => {
//     props.getSession();
//     props.getProfile();
//   }, []);

//   const paddingTop = '60px';
//   return (
//     <Router basename={baseHref}>
//       <div className="app-container" style={{ paddingTop }}>
//         <ToastContainer position={toast.POSITION.TOP_LEFT} className="toastify-container" toastClassName="toastify-toast" />
//         <ErrorBoundary>
//           <Header
//             isAuthenticated={props.isAuthenticated}
//             isAdmin={props.isAdmin}
//             ribbonEnv={props.ribbonEnv}
//             isInProduction={props.isInProduction}
//             isSwaggerEnabled={props.isSwaggerEnabled}
//           />
//         </ErrorBoundary>
//         <div className="container-fluid view-container" id="app-view-container">
//           <Card className="jh-card">
//             <ErrorBoundary>
//               <AppRoutes />
//             </ErrorBoundary>
//           </Card>
//           <Footer />
//         </div>
//       </div>
//     </Router>
//   );
// };

// const mapStateToProps = ({ authentication, applicationProfile }: IRootState) => ({
//   isAuthenticated: authentication.isAuthenticated,
//   isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN]),
//   ribbonEnv: applicationProfile.ribbonEnv,
//   isInProduction: applicationProfile.inProduction,
//   isSwaggerEnabled: applicationProfile.isSwaggerEnabled
// });

// const mapDispatchToProps = { getSession, getProfile };

// type StateProps = ReturnType<typeof mapStateToProps>;
// type DispatchProps = typeof mapDispatchToProps;

// export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(App));
import './app.scss';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from 'app/shared/layout/header/Navigation';
import Login from 'app/modules/login/Login';
import ViewSubscriptions from 'app/modules/pages/subscriptions/ViewSubscriptions';
import ViewInvoices from 'app/modules/pages/invoices/ViewInvoices';
import CreateInvoices from 'app/modules/pages/invoices/CreateInvoices';
import RegisterBiller from 'app/modules/pages/biller-management/RegisterBiller';
import ViewBillers from 'app/modules/pages/biller-management/ViewBillers';
import ViewServiceGroups from './modules/pages/service-group/ViewServiceGroups';
import GenerateServiceGroups from './modules/pages/service-group/GenerateServiceGroups';
import GenerateServiceUnits from './modules/pages/service-unit/GenerateServiceUnits';
import ViewServiceUnits from './modules/pages/service-unit/ViewServiceUnits';
import ViewUserGroups from './modules/pages/user-management/ViewUserGroups';
import ViewUsers from './modules/pages/user-management/ViewUsers';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/dashboard" component={Layout} />
        <Layout>
          <Route exact path="/dashboard/view-subscriptions" component={ViewSubscriptions} />
          <Route exact path="/dashboard/view-invoices" component={ViewInvoices} />
          <Route exact path="/dashboard/create-invoices" component={CreateInvoices} />
          <Route exact path="/dashboard/register-biller" component={RegisterBiller} />
          <Route exact path="/dashboard/view-billers" component={ViewBillers} />
          <Route exact path="/dashboard/view-service-groups" component={ViewServiceGroups} />
          <Route exact path="/dashboard/generate-service-groups" component={GenerateServiceGroups} />
          <Route exact path="/dashboard/generate-service-units" component={GenerateServiceUnits} />
          <Route exact path="/dashboard/view-service-units" component={ViewServiceUnits} />
          <Route exact path="/dashboard/view-user-groups" component={ViewUserGroups} />
          <Route exact path="/dashboard/view-users" component={ViewUsers} />
        </Layout>
      </Switch>
    </Router>
  );
};

export default App;
