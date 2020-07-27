import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
// import { useStore } from 'app/mobx/stores/store';
// import { observer } from 'mobx-react-lite';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText, Collapse } from '@material-ui/core';
import {
  ExpandLess,
  ExitToApp,
  RecentActors,
  ExpandMore,
  Subscriptions,
  Pageview,
  Receipt,
  Create,
  GroupWork,
  LooksOne,
  CreditCard
} from '@material-ui/icons';
// import LoginStore from 'app/mobx/stores/LoginStore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: 'white',
      width: '100%',
      maxWidth: 360
    },
    nested: {
      paddingLeft: theme.spacing(4)
    }
  })
);

const MenuLists = (props: any) => {
  // const { loginStore } = useStore();
  const classes = useStyles();
  const history = useHistory();
  const [openSubscriptions, setOpenSubscriptions] = React.useState(false);
  const [openInvoices, setOpenInvoices] = React.useState(false);
  const [openGroup, setOpenGroup] = React.useState(false);
  const [openUnit, setOpenUnit] = React.useState(false);
  const [openManagement, setOpenManagement] = React.useState(false);
  const [openBiller, setOpenBiller] = React.useState(false);

  const { handleDrawerOpen } = props;

  return (
    <>
      <List className={classes.root}>
        {/* Subscriptions */}
        <ListItem button onClick={() => setOpenSubscriptions(!openSubscriptions)}>
          <ListItemIcon>
            <Subscriptions style={{ color: 'white' }} onClick={handleDrawerOpen} />
          </ListItemIcon>
          <ListItemText primary="Subscriptions" />
          {openSubscriptions ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openSubscriptions} timeout="auto" unmountOnExit>
          <List component="div" disablePadding onClick={() => history.push('/dashboard/view-subscriptions')}>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <Pageview style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="View subscriptions" />
            </ListItem>
          </List>
        </Collapse>
        {/* Invoice */}
        <ListItem button onClick={() => setOpenInvoices(!openInvoices)}>
          <ListItemIcon>
            <Receipt style={{ color: 'white' }} onClick={handleDrawerOpen} />
          </ListItemIcon>
          <ListItemText primary="Invoice" />
          {openInvoices ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openInvoices} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested} onClick={() => history.push('/dashboard/view-invoices')}>
              <ListItemIcon>
                <Pageview style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="View Invoices" />
            </ListItem>
            <ListItem button className={classes.nested} onClick={() => history.push('/dashboard/create-invoices')}>
              <ListItemIcon>
                <Create style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="Create Invoices" />
            </ListItem>
          </List>
        </Collapse>
        {/* Service Group */}
        <ListItem button onClick={() => setOpenGroup(!openGroup)}>
          <ListItemIcon>
            <GroupWork style={{ color: 'white' }} onClick={handleDrawerOpen} />
          </ListItemIcon>
          <ListItemText primary="Service Group" />
          {openGroup ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openGroup} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested} onClick={() => history.push('/dashboard/view-service-groups')}>
              <ListItemIcon>
                <Pageview style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="View Service Groups" />
            </ListItem>
            <ListItem button className={classes.nested} onClick={() => history.push('/dashboard/generate-service-groups')}>
              <ListItemIcon>
                <Create style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="Generate Service Groups" />
            </ListItem>
          </List>
        </Collapse>
        {/* Service Unit */}
        <ListItem button onClick={() => setOpenUnit(!openUnit)}>
          <ListItemIcon>
            <LooksOne style={{ color: 'white' }} onClick={handleDrawerOpen} />
          </ListItemIcon>
          <ListItemText primary="Service Unit" />
          {openUnit ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openUnit} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested} onClick={() => history.push('/dashboard/view-service-units')}>
              <ListItemIcon>
                <Pageview style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="View Service Units" />
            </ListItem>
            <ListItem button className={classes.nested} onClick={() => history.push('/dashboard/generate-service-units')}>
              <ListItemIcon>
                <Create style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="Generate Service Units" />
            </ListItem>
          </List>
        </Collapse>
        {/* Biller Management */}
        <ListItem button onClick={() => setOpenBiller(!openBiller)}>
          <ListItemIcon>
            <CreditCard style={{ color: 'white' }} onClick={handleDrawerOpen} />
          </ListItemIcon>
          <ListItemText primary="Biller Management" />
          {openBiller ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openBiller} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested} onClick={() => history.push('/dashboard/view-billers')}>
              <ListItemIcon>
                <Pageview style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="View Billers" />
            </ListItem>
            <ListItem button className={classes.nested} onClick={() => history.push('/dashboard/register-biller')}>
              <ListItemIcon>
                <Create style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="Register Biller" />
            </ListItem>
          </List>
        </Collapse>
        {/* User Management */}
        <ListItem
          button
          onClick={() => setOpenManagement(!openManagement)}
          // disabled={loginStore.loggedInUser.role === 'ROLE_BILLER' ? false : true}
        >
          <ListItemIcon>
            <RecentActors style={{ color: 'white' }} onClick={handleDrawerOpen} />
          </ListItemIcon>
          <ListItemText primary="User Management" />
          {openManagement ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openManagement} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested} onClick={() => history.push('/dashboard/view-users')}>
              <ListItemIcon>
                <Pageview style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="View Users" />
            </ListItem>
            <ListItem button className={classes.nested} onClick={() => history.push('/dashboard/view-user-groups')}>
              <ListItemIcon>
                <Pageview style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="View User Groups" />
            </ListItem>
          </List>
        </Collapse>
        {/* Logout */}
        <ListItem button onClick={() => history.push('/')}>
          <ListItemIcon>
            <ExitToApp style={{ color: 'white' }} onClick={handleDrawerOpen} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </>
  );
};

export default MenuLists;
