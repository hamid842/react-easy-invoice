import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';

const drawerWidth = 270;

const open = localStorage.getItem('open-nav');

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    justifyContent: 'center',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  }
}));

const ViewSubscriptions = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        hello from subscriptions
      </div>
    </div>
  );
};

export default ViewSubscriptions;
