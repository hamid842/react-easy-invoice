/* eslint no-console: off */
export default () => (next: (arg0: any) => any) => (action: { type: any; payload: any; meta: any }) => {
  if (process.env.NODE_ENV !== 'production') {
    const { type, payload, meta } = action;

    console.groupCollapsed(type);
    console.log('Payload:', payload);
    console.log('Meta:', meta);
    console.groupEnd();
  }

  return next(action);
};
