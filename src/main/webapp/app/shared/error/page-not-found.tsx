import React from 'react';

import { Alert } from '@material-ui/lab';

class PageNotFound extends React.Component {
  render() {
    return (
      <div>
        <Alert severity="error">The page does not exist.</Alert>
      </div>
    );
  }
}

export default PageNotFound;
