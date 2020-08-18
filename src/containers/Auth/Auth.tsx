import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import classes from './Auth.module.css';
import {
  makeStyles,
  Theme,
  createStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import { Typography } from '@material-ui/core';
import { auth } from '../../store/actions/index';
import { connect, ConnectedProps } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

type IFormInputs = {
  email: string;
  password: string;
  passwordConfirmation?: string;
};

const schema = yup.object({
  email: yup.string().email().required('Email Required'),
  password: yup
    .string()
    .required('Password Required')
    .min(6, 'Password minimum length of 6 characters required.'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match'),
});

type stateType = {
  auth: {
    loading: boolean;
    error: Error;
    token: string;
  };
};

const mapState = (state: stateType) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuth: state.auth.token !== '',
});

const mapDispatch = {
  onAuth: (email: string, password: string, method: boolean) =>
    auth(email, password, method),
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

function Auth({ onAuth, loading, error, isAuth }: PropsFromRedux) {
  const [mode, setMode] = useState(true);
  const style = useStyles();

  const { handleSubmit, errors, formState, register } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const onSubmit = (data: IFormInputs) => {
    onAuth(data.email, data.password, mode);
  };

  const switchModeHandler = () => {
    setMode(!mode);
  };

  let errorMessage = null;
  if (error) {
    errorMessage = <p>{error.message}</p>;
  }

  let authRedirect = null;
  if (isAuth) {
    authRedirect = <Redirect to='/burger-builder' />;
  }

  const PwConfirm = (
    <TextField
      className={style.margin}
      type='password'
      label='Password'
      name='passwordConfirmation'
      inputRef={register}
      error={!!errors.passwordConfirmation}
      helperText={errors.passwordConfirmation?.message}
      variant='outlined'
      required
    />
  );

  const Form = (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.Input}>
      <Card className={classes.Input2}>
        {errorMessage}
        {authRedirect}
        <Typography variant='h5'>{!mode ? 'Sign In' : 'Sign Up'}</Typography>
        <ThemeProvider theme={theme}>
          <TextField
            className={style.margin}
            type='email'
            label='Email'
            name='email'
            inputRef={register}
            error={!!errors.email}
            helperText={errors.email?.message}
            variant='outlined'
            required
          />
          <TextField
            className={style.margin}
            type='password'
            label='Password'
            name='password'
            inputRef={register}
            error={!!errors.password}
            helperText={errors.password?.message}
            variant='outlined'
            required
          />
          {mode ? PwConfirm : null}
          <Button
            color='primary'
            type='submit'
            size='large'
            disabled={!formState.isValid}
          >
            SUBMIT
          </Button>
        </ThemeProvider>
      </Card>
      <br />
      <Button onClick={switchModeHandler}>
        SWITCH TO {mode ? 'SIGN IN' : 'SIGN UP'}
      </Button>
    </form>
  );

  return <React.Fragment>{loading ? <Spinner /> : Form}</React.Fragment>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
      width: '80%',
    },
  })
);

const theme = createMuiTheme({
  palette: {
    primary: orange,
  },
});

export default connector(Auth);
