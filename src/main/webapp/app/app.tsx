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
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
  root: {
    width: '100%'
  }
});

const App = () => {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);

  const progressRef = React.useRef(() => {});
  React.useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(timer);
      <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />;
    };
  }, []);
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
