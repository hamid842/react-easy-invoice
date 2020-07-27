import React, { ChangeEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Theme, withStyles } from '@material-ui/core/styles';
import { TextField, Button, Grid, InputAdornment, IconButton, CircularProgress } from '@material-ui/core';
import { Person, Lock, VisibilityOff, Visibility } from '@material-ui/icons';
import { connect } from 'react-redux';
import { login } from 'app/shared/reducers/authentication';
import { IRootState } from 'app/shared/reducers';

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

export interface ILoginProps extends StateProps, DispatchProps {}

const LoginForm = (props: ILoginProps) => {
  // const { loginStore } = useStore();
  const { account, isAuthenticated, loading, errorMessage } = props;
  const history = useHistory();
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

  const handleLogin = () => {
    props.login(userInfo.userName, userInfo.password);
    // eslint-disable-next-line no-console
    console.log(isAuthenticated);
  };
  return (
    <>
      <form noValidate={false}>
        <Grid container spacing={errorMessage ? 4 : 5} justify="center">
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
            {errorMessage}
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

const mapStateToProps = ({ authentication }: IRootState) => ({
  loading: authentication.loading,
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated,
  errorMessage: authentication.errorMessage
});

const mapDispatchToProps = { login };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
