import React from "react";
import PropTypes from "prop-types";

function InfoText({ field, errorMessage }) {
  if (errorMessage != null && errorMessage !== "") {
    return (
      <small className="red form-text">
        <div>{errorMessage}</div>
      </small>
    );
  }

  if (field?.formText == null) {
    return null;
  }

  return (
    <small className="text-muted form-text">
      <div>{field?.formText}</div>
    </small>
  );
}

InfoText.propTypes = {
  field: PropTypes.object,
  errorMessage: PropTypes.string
};

export default InfoText;