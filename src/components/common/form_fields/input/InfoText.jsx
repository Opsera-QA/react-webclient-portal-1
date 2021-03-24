import React from "react";
import PropTypes from "prop-types";

function InfoText({ field, errorMessage }) {
  if (errorMessage != null && errorMessage !== "") {
    return (
      <div className="invalid-feedback">
        <div>{errorMessage}</div>
      </div>
    );
  }

  return (
    <small className="text-muted form-text">
      <div>{field.formText}</div>
    </small>
  );
}

InfoText.propTypes = {
  field: PropTypes.object,
  errorMessage: PropTypes.string
};

export default InfoText;