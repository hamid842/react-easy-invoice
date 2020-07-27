import { isPromise } from 'react-jhipster';

const getErrorMessage = (errorData: { message: any; fieldErrors: any[] }) => {
  let message = errorData.message;
  if (errorData.fieldErrors) {
    errorData.fieldErrors.forEach((fErr: { field: any; objectName: any; message: any }) => {
      message += `\nfield: ${fErr.field},  Object: ${fErr.objectName}, message: ${fErr.message}\n`;
    });
  }
  return message;
};

export default () => (next: (arg0: any) => Promise<any>) => (action: { payload: any; type: any }) => {
  // If not a promise, continue on
  if (!isPromise(action.payload)) {
    return next(action);
  }

  /**
   *
   * The error middleware serves to dispatch the initial pending promise to
   * the promise middleware, but adds a `catch`.
   * It need not run in production
   */
  if (process.env.NODE_ENV === 'development') {
    // Dispatch initial pending promise, but catch any errors
    return next(action).catch((error: { message: any; response: { data: any } }) => {
      console.error(`${action.type} caught at middleware with reason: ${JSON.stringify(error.message)}.`);
      if (error && error.response && error.response.data) {
        const message = getErrorMessage(error.response.data);
        console.error(`Actual cause: ${message}`);
      }

      return Promise.reject(error);
    });
  }
  return next(action);
};
