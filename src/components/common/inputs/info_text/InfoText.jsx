import React from "react";
import PropTypes from "prop-types";
import regexDefinitions from "utils/regexDefinitions";
import {hasStringValue} from "components/common/helpers/string-helpers";

function InfoText(
  {
    field,
    errorMessage,
    customMessage,
    successMessage,
    hideRegexDefinitionText,
    model,
    fieldName,
  }) {
  if (hasStringValue(errorMessage) === true) {
    return (
      <small className={"danger-red form-text ml-1"}>
        <div>{errorMessage}</div>
      </small>
    );
  }

  if(hasStringValue(successMessage) === true) {
    return (
      <small className={"green form-text ml-1"}>
        <div>{successMessage}</div>
      </small>
    );
  }

  if (hasStringValue(field?.formText) === true) {
    return (
      <small className={"text-muted form-text ml-1"}>
        <div>{field?.formText}</div>
      </small>
    );
  }

  if (field?.regexDefinitionName != null) {
    const definitionName = field.regexDefinitionName;
    const regexDefinition = regexDefinitions[definitionName];
    const isRequiredFunction = regexDefinition?.isRequiredFunction;

    if (hideRegexDefinitionText !== true && regexDefinition != null && (isRequiredFunction == null || isRequiredFunction(model) === true)) {
      return (
        <small className={"text-muted form-text ml-1"}>
          <div>{regexDefinition?.formText}</div>
        </small>
      );
    }
  }

  if (model && field) {
    const warning = model?.getFieldWarning(field?.id);

      if (hasStringValue(warning) === true) {
        return (
          <small className={"warning-text-alt form-text ml-1"}>
            <div>{warning}</div>
          </small>
        );
      }
  }

  if (customMessage == null) {
    return null;
  }

  return (
    <small className={"text-muted form-text ml-1"}>
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
  model: PropTypes.object,
  fieldName: PropTypes.string,
};

export default InfoText;
