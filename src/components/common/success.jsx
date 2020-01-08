import React from 'react';
import { Alert } from 'react-bootstrap';

class SuccessDialog extends React.Component {
  render() {
    return (
      <div className="mt-3 mb-3">
        <Alert variant="success">
          {this.props.successMessage}
        </Alert>
      </div>
    );
  }
}

export default SuccessDialog;