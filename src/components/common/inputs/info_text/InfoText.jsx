import React from "react";
import PropTypes from "prop-types";
import regexDefinitions from "utils/regexDefinitions";

function InfoText(
  {
    field,
    errorMessage,
    customMessage,
    successMessage,
    hideRegexDefinitionText,
  }) {
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

  if (field?.formText != null && field?.formText !== "") {
    return (
      <small className="text-muted form-text">
        <div>{field?.formText}</div>
      </small>
    );
  }

  if (field?.regexDefinitionName != null && regexDefinitions[field?.regexDefinitionName] !== null && hideRegexDefinitionText !== true) {
    return (
      <small className="text-muted form-text">
        <div>{regexDefinitions[field?.regexDefinitionName]?.formText}</div>
      </small>
    );
  }

  if (customMessage == null) {
    return null;
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
  hideRegexDefinitionText: PropTypes.bool,
};

export default InfoText;