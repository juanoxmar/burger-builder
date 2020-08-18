import { AUTH_FAIL, AUTH_START, AUTH_SUCCESS, LOG_OUT } from './actionTypes';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../index';
import { Action } from 'redux';
import { KEY } from '../../axios-orders';
import axios from 'axios';

const authStart = () => ({
  type: AUTH_START,
});

const authSuccess = (token: string, userId: string) => ({
  type: AUTH_SUCCESS,
  idToken: token,
  userId: userId,
});

const authFail = (error: Error) => ({
  type: AUTH_FAIL,
  error: error,
});

export const logOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: LOG_OUT,
  };
};

type authThunk = ThunkAction<void, RootState, unknown, Action<string>>;

const checkAuthTimeout = (expireTime: number): authThunk => async (
  dispatch
) => {
  setTimeout(() => {
    dispatch(logOut());
  }, +expireTime * 1000);
};

export const auth = (
  email: string,
  password: string,
  method: boolean
): authThunk => async (dispatch) => {
  try {
    dispatch(authStart());
    if (method) {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${KEY}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      );
      const expirationDate = new Date(
        new Date().getTime() + response.data.expiresIn * 1000
      );
      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('expirationDate', expirationDate.toString());
      localStorage.setItem('userId', response.data.localId);
      dispatch(authSuccess(response.data.idToken, response.data.localId));
    } else {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${KEY}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      );
      const expirationDate = new Date(
        new Date().getTime() + response.data.expiresIn * 1000
      );
      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('expirationDate', expirationDate.toString());
      localStorage.setItem('userId', response.data.localId);
      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    }
  } catch (error) {
    dispatch(authFail(error));
  }
};

export const authCheckState = (): authThunk => (dispatch) => {
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch(logOut());
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate')!);
    if (expirationDate <= new Date()) {
      dispatch(logOut());
    } else {
      const userId = localStorage.getItem('userId')!;
      dispatch(authSuccess(token, userId));
      dispatch(
        checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
};
