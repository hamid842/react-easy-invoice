import axios from 'axios';
import { getBasePath, Storage } from 'react-jhipster';

import { SERVER_API_URL } from 'app/config/constants';

const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = SERVER_API_URL;

const setupAxiosInterceptors = (onUnauthenticated: () => void) => {
  const onRequestSuccess = (config: any) => {
    return config;
  };
  const onResponseSuccess = (response: any) => response;
  const onResponseError = (err: { status: any; response: { status: any } }) => {
    const status = err.status || (err.response ? err.response.status : 0);
    if (status === 403 || status === 401) {
      onUnauthenticated();
    }
    return Promise.reject(err);
  };
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
