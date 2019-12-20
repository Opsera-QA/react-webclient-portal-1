import React from 'react';
import { Spinner } from 'react-bootstrap';

class loadingDialog extends React.Component {
  render() {
    return (
      <div className="loading">
        <div className="loader">
          <Spinner as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true" /> Loading...
        </div>
      </div>
    );
  }
}

export default loadingDialog;