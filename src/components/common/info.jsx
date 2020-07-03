import React from "react";
import PropTypes from "prop-types";


function InformationDialog ({ message }) {
  return (
    <div className="h-100 d-flex justify-content-center align-items-center min-content-message-dimension">
      <div className="info-text">
        {message}
      </div>
    </div>
  );
}

InformationDialog.propTypes = {
  message: PropTypes.string
};
export default InformationDialog;