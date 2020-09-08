import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText, Collapse } from '@material-ui/core';
import { ExpandLess, ExitToApp, RecentActors, ExpandMore, Pageview, Create, CreditCard } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .Mui-disabled': {
        display: 'none'
      },
      color: 'white',
      width: '100%',
      maxWidth: 360
    },
    nested: {
      paddingLeft: theme.spacing(4)
    }
  })
);

const AdminMenuList = (props: any) => {
  const classes = useStyles();
  const history = useHistory();
  const [openManagement, setOpenManagement] = React.useState(false);
  const [openBiller, setOpenBiller] = React.useState(false);

  const { handleDrawerOpen } = props;
  return (
    <>
      <List className={classes.root}>
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
        <ListItem button onClick={() => setOpenManagement(!openManagement)}>
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
        <ListItem
          onClick={() => {
            localStorage.removeItem('role');
            history.push('/');
          }}
        >
          <ListItemIcon>
            <ExitToApp style={{ color: 'white' }} onClick={handleDrawerOpen} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </>
  );
};

export default AdminMenuList;
