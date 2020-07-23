import React from 'react';
import LoginForm from './LoginForm';
import { Grid, Typography, Box, Button } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    position: 'absolute',
    overflow: 'hidden',
    background: 'linear-gradient(#00ddc2,#008272)'
  },
  container: {
    alignItems: 'center'
  },
  logo: {
    justifyItems: 'center'
  },
  box: {
    width: '350px',
    height: '280px',
    background: 'white',
    borderRadius: '10px',
    margin: 'auto',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    color: 'white'
  },
  registerBtn: {
    textAlign: 'center',
    color: 'white'
  }
}));

export default function Login() {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <Grid container className={classes.container} justify="center">
        <Grid item className={classes.logo}>
          <img src="content/images/logo1.png" alt="Logo" width="180px" height="100px" />
        </Grid>
        <Grid item xs={12} className={classes.text}>
          <Typography variant="h5" gutterBottom>
            Login or Register to continue
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.box}>
            <LoginForm />
          </Box>
        </Grid>
        <Grid item xs={12} className={classes.registerBtn}>
          <Button color="inherit">Register</Button>
        </Grid>
      </Grid>
    </div>
  );
}
