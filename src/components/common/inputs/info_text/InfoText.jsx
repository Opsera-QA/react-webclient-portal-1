import React from "react";
import PropTypes from "prop-types";

function InfoText({ field, errorMessage, customMessage, successMessage }) {
  if (errorMessage != null && errorMessage !== "") {
    return (
      <small className="red form-text">
        <div>{errorMessage}</div>
      </small>
    );
  }

  if(successMessage != null && successMessage !== "") {
    return (
      <small className="green form-text">
        <div>{successMessage}</div>
      </small>
    );
  }

  if (field?.formText == null && customMessage == null) {
    return null;
  }

  if (field.formText != null && field.formText !== "") {
    return (
      <small className="text-muted form-text">
        <div>{field?.formText}</div>
      </small>
    );
  }

  return (
    <small className="text-muted form-text">
      <div>{customMessage}</div>
    </small>
  );
}

InfoText.propTypes = {
  field: PropTypes.object,
  errorMessage: PropTypes.string,
  customMessage: PropTypes.string,
  successMessage: PropTypes.string,
};

export default InfoText;