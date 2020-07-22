import React, { useState } from 'react';
import { makeStyles, useTheme, Theme, withStyles } from '@material-ui/core/styles';
import { TextField, Button, Grid, InputAdornment, IconButton } from '@material-ui/core';
import { Person, Lock, VisibilityOff, Visibility } from '@material-ui/icons';

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#00ddc2'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#00ddc2'
    }
  }
})(TextField);

const ColorButton = withStyles((theme: Theme) => ({
  root: {
    backgroundColor: '#00ddc2',
    '&:hover': {
      backgroundColor: '#008272'
    }
  }
}))(Button);

const useStyles = makeStyles((theme: Theme) => ({}));

export default function LoginForm() {
  const [userInfo, setUserInfo] = useState({
    userName: '',
    password: '',
    showPassword: false
  });

  const classes = useStyles();
  const theme = useTheme();

  const handleClickShowPassword = () => {
    setUserInfo({ ...userInfo, showPassword: !userInfo.showPassword });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <form noValidate={false}>
        <Grid container spacing={5} justify="center">
          <Grid item xs={12}>
            <Grid container spacing={1} alignItems="flex-end" justify="center">
              <Grid item>
                <Person />
              </Grid>
              <Grid item>
                <CssTextField
                  required
                  id="custom-css-standard-password"
                  label="Username"
                  onChange={e => setUserInfo({ ...userInfo, userName: e.target.value })}
                  style={{ width: '250px' }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1} alignItems="flex-end" justify="center">
              <Grid item>
                <Lock />
              </Grid>
              <Grid item>
                <CssTextField
                  required
                  type={userInfo.showPassword ? 'text' : 'password'}
                  value={userInfo.password}
                  id="custom-css-standard-password-input"
                  label="Password"
                  onChange={e => setUserInfo({ ...userInfo, password: e.target.value })}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {userInfo.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <ColorButton variant="contained" color="primary">
              LOGIN
            </ColorButton>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
