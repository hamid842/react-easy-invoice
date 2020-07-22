import React from 'react';
import { useHistory } from 'react-router-dom';
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
  LooksOne
} from '@material-ui/icons';

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

export default function Menu(props: any) {
  const classes = useStyles();
  const history = useHistory();
  const [openSubscriptions, setOpenSubscriptions] = React.useState(false);
  const [openInvoices, setOpenInvoices] = React.useState(false);
  const [openGroup, setOpenGroup] = React.useState(false);
  const [openUnit, setOpenUnit] = React.useState(false);
  const [openManagment, setOpenManagment] = React.useState(false);

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
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <Pageview style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="View Service Groups" />
            </ListItem>
            <ListItem button className={classes.nested}>
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
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <Pageview style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="View Service Units" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <Create style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="Generate Service Units" />
            </ListItem>
          </List>
        </Collapse>
        {/* User Managment */}
        <ListItem button onClick={() => setOpenManagment(!openManagment)}>
          <ListItemIcon>
            <RecentActors style={{ color: 'white' }} onClick={handleDrawerOpen} />
          </ListItemIcon>
          <ListItemText primary="User Management" />
          {openManagment ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openManagment} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <Pageview style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="View Users" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <Pageview style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="View User Groups" />
            </ListItem>
          </List>
        </Collapse>
        {/* Logout */}
        <ListItem button>
          <ListItemIcon>
            <ExitToApp style={{ color: 'white' }} onClick={handleDrawerOpen} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </>
  );
}
