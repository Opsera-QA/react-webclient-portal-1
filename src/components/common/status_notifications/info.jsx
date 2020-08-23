import React from "react";
import PropTypes from "prop-types";


function InformationDialog ({ message }) {
  return (
    <div className="mt-1 mb-3">
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