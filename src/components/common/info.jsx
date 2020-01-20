import React from "react";
import PropTypes from "prop-types";
import { Alert } from "react-bootstrap";


function InformationDialog ({ message }) {
  return (
    <div className="mt-1 mb-3">
      <Alert variant="info">
        {message}
      </Alert>
    </div>
  );
}

InformationDialog.propTypes = {
  message: PropTypes.string
};
export default InformationDialog;