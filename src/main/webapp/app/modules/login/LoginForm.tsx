import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Theme, withStyles } from '@material-ui/core/styles';
import { TextField, Button, Grid, InputAdornment, IconButton, CircularProgress } from '@material-ui/core';
import { Person, Lock, VisibilityOff, Visibility } from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';

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
    error: '',
    loading: false
  });

  const handleClickShowPassword = () => {
    setUserInfo({ ...userInfo, showPassword: !userInfo.showPassword });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleLogin = async () => {
    setUserInfo({ ...userInfo, loading: true });
    const requestBody = {
      phoneNumber: userInfo.userName,
      password: userInfo.password
    };
    await axios
      .post(loginEndpoint, requestBody, { headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        setUserInfo({ ...userInfo, loading: false });
        const successResponse = response.status === 200 || 201;
        if (successResponse) {
          history.push('/dashboard');
          toast.success("You're logged in!");
        }
      })
      .catch(error => {
        const message = error.response.data.error;
        setUserInfo({ ...userInfo, error: message });
        toast.error(message);
      });
  };

  return (
    <>
      <form noValidate={false}>
        <Grid container spacing={userInfo.error ? 4 : 5} justify="center">
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
          <Grid item style={{ color: 'red', textAlign: 'center' }} xs={12}>
            {userInfo.error}
          </Grid>
          <Grid item>
            <ColorButton
              variant="contained"
              color="primary"
              disabled={userInfo.userName === '' || userInfo.password === ''}
              onClick={handleLogin}
            >
              {userInfo.loading && <CircularProgress size={26} color="inherit" />}
              {!userInfo.loading && 'LOGIN'}
            </ColorButton>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
