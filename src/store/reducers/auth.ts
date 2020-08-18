import {
  AUTH_FAIL,
  AUTH_START,
  AUTH_SUCCESS,
  LOG_OUT,
} from '../actions/actionTypes';

export type authDataType = {
  idToken: string; // A Firebase Auth ID token for the authenticated user.
  email: string; // The email for the authenticated user.
  refreshToken: string; // A Firebase Auth refresh token for the authenticated user.
  expiresIn: string; // The number of seconds in which the ID token expires.
  localId: string; // The uid of the authenticated user.
  registered?: boolean; // Whether the email is for an existing account.
};

type AuthStartAction = {
  type: typeof AUTH_START;
};

type AuthSuccessAction = {
  type: typeof AUTH_SUCCESS;
  idToken: string;
  userId: string;
};

type AuthFailAction = {
  type: typeof AUTH_FAIL;
  error: Error;
};

type LogOutAction = {
  type: typeof LOG_OUT;
};

type actionType =
  | AuthFailAction
  | AuthStartAction
  | AuthSuccessAction
  | LogOutAction;

type initialStateType = {
  token: string;
  userId: string;
  error: Error | null;
  loading: boolean;
};

const initialState: initialStateType = {
  token: '',
  userId: '',
  error: null,
  loading: false,
};

const reducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false,
      };
    case AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case LOG_OUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default reducer;
