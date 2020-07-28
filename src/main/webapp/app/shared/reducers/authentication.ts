/* eslint-disable @typescript-eslint/camelcase */
import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

const loginEndpoint = 'https://gateway.m1payall.com/einvoice/api/user-info/login';

export const ACTION_TYPES = {
  LOGIN: 'authentication/LOGIN',
  CLEAR_AUTH: 'authentication/CLEAR_AUTH',
  ERROR_MESSAGE: 'authentication/ERROR_MESSAGE'
};

const initialState = {
  loading: false,
  isAuthenticated: false,
  account: {} as any,
  errorMessage: null
};

export type AuthenticationState = Readonly<typeof initialState>;

// Reducer
export default (state: AuthenticationState = initialState, action: any): AuthenticationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.LOGIN):
      return {
        ...state,
        loading: true
      };
    case FAILURE(ACTION_TYPES.LOGIN):
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        errorMessage: action.payload.error
      };
    case SUCCESS(ACTION_TYPES.LOGIN): {
      const isAuthenticated = action.payload.data ? true : false;
      return {
        ...state,
        isAuthenticated,
        loading: false,
        account: action.payload.data.data
      };
    }
    default:
      return state;
  }
};

// Action
export const displayAuthError = (message: any) => ({ type: ACTION_TYPES.ERROR_MESSAGE, message });

export const login = (phoneNumber: any, password: any) => async (dispatch: any, getState: any) => {
  const requestBody = {
    phoneNumber,
    password
  };
  await dispatch({
    type: ACTION_TYPES.LOGIN,
    payload: axios.post(loginEndpoint, requestBody, { headers: { 'Content-Type': 'application/json' } })
  });
};
export const clearAuthentication = (messageKey: any) => (dispatch: any, getState: any) => {
  dispatch(displayAuthError(messageKey));
  dispatch({
    type: ACTION_TYPES.CLEAR_AUTH
  });
};
