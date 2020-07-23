import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

const drawerWidth = 270;

const useStyles = makeStyles((theme: Theme) => ({}));

const ViewSubscriptions = () => {
  const classes = useStyles();

  return (
    <div>
      {/* <CssBaseline /> */}
      <div>hello from subscriptions</div>
    </div>
  );
};

export default ViewSubscriptions;
