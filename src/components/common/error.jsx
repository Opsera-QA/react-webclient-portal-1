import React from 'react';
import { Alert } from 'react-bootstrap';

class errorDialog extends React.Component {
  render() {
    return (
      <div className="mt-3 mb-3">
        <Alert variant="danger">
          {this.props.errorMessage}
        </Alert>
      </div>
    );
  }
}

export default errorDialog;