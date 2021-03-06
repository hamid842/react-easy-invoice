import './app.scss';
import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
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
import { makeStyles } from '@material-ui/core/styles';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles({
  root: {
    width: '100%'
  }
});

const App: FC = () => {
  return (
    <Router>
      <ToastContainer position={toast.POSITION.TOP_LEFT} className="toastify-container" toastClassName="toastify-toast" />
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
