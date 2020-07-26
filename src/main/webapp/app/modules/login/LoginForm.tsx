import React, { FC, ChangeEvent, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from 'app/mobx/stores/store';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Theme, withStyles } from '@material-ui/core/styles';
import { TextField, Button, Grid, InputAdornment, IconButton, CircularProgress } from '@material-ui/core';
import { Person, Lock, VisibilityOff, Visibility } from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';
import Login from './Login';

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

const LoginForm: FC = observer(() => {
  const { loginStore } = useStore();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
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
    await loginStore.login(userInfo.userName, userInfo.password);
    if (loginStore.loggedInUser.responseStatus === 200) {
      history.push('/dashboard');
    }
    setLoading(false);
  };
  return (
    <>
      <form noValidate={false}>
        <Grid container spacing={loginStore.loggedInUser.error ? 4 : 5} justify="center">
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
            {loginStore.loggedInUser.error}
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
});

export default LoginForm;
