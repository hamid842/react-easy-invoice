import React, { ChangeEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Theme, withStyles } from '@material-ui/core/styles';
import { TextField, Button, Grid, InputAdornment, IconButton, CircularProgress } from '@material-ui/core';
import { Person, Lock, VisibilityOff, Visibility } from '@material-ui/icons';
import { connect } from 'react-redux';
import { login } from 'app/shared/reducers/authentication';
import { IRootState } from 'app/shared/reducers';
import axios from 'axios';

// Endpoint
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

const LoginForm = (props: any) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userInfo, setUserInfo] = useState({
    userName: '',
    password: '',
    showPassword: false
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setUserInfo({ ...userInfo, showPassword: !userInfo.showPassword });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleLogin = async () => {
    setLoading(true);
    const requestBody = {
      phoneNumber: userInfo.userName,
      password: userInfo.password
    };
    await axios
      .post(loginEndpoint, requestBody, { headers: { 'Content-Type': 'application/json' } })
      .then(res => {
        const status = res.status;
        // eslint-disable-next-line no-constant-condition
        if (status === 200 || 201) {
          history.push('/dashboard');
          toast.success(`You are logged in as user ${res.data.data.fullName}`);
        }
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        const message = err.response.data.error;
        setError(message);
        toast.error(message);
      });
  };

  return (
    <>
      <form noValidate={false}>
        <Grid container spacing={error ? 4 : 5} justify="center">
          <Grid item xs={12}>
            <Grid container spacing={1} alignItems="flex-end" justify="center">
              <Grid item>
                <Person />
              </Grid>
              <Grid item>
                <CssTextField
                  required
                  name="userName"
                  value={userInfo.userName}
                  id="custom-css-standard-password"
                  label="Username"
                  onChange={handleChange}
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
                  name="password"
                  type={userInfo.showPassword ? 'text' : 'password'}
                  value={userInfo.password}
                  id="custom-css-standard-password-input"
                  label="Password"
                  onChange={handleChange}
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
            {error}
          </Grid>
          <Grid item>
            <ColorButton
              variant="contained"
              color="primary"
              disabled={userInfo.userName === '' || userInfo.password === ''}
              onClick={handleLogin}
            >
              {loading && <CircularProgress size={26} color="inherit" />}
              {!loading && 'LOGIN'}
            </ColorButton>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default LoginForm;
