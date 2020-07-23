import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import qs from 'qs';
import axios from 'axios';
import { makeStyles, useTheme, Theme, withStyles } from '@material-ui/core/styles';
import { TextField, Button, Grid, InputAdornment, IconButton } from '@material-ui/core';
import { Person, Lock, VisibilityOff, Visibility } from '@material-ui/icons';

// Endpoints
const loginEndpoint = 'https://gateway.m1payall.com/einvoice/api/user-info/login';

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

export default function LoginForm() {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({
    userName: '',
    password: '',
    showPassword: false,
    error: ''
  });

  const handleClickShowPassword = () => {
    setUserInfo({ ...userInfo, showPassword: !userInfo.showPassword });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleLogin = async () => {
    const requestBody = {
      phoneNumber: userInfo.userName,
      password: userInfo.password
    };
    await axios
      .post(loginEndpoint, requestBody, { headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        const successResponse = response.status === 200 || 201;
        successResponse ? history.push('/dashboard') : toast.error('Something is wrong');
      })
      .catch(error => {
        const message = error.response.data.error;
        toast.error(message);
      });
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
                  value={userInfo.userName}
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
            <ColorButton
              variant="contained"
              color="primary"
              disabled={userInfo.userName === '' || userInfo.password === ''}
              onClick={handleLogin}
            >
              LOGIN
            </ColorButton>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
