import React from "react";
import PropTypes from "prop-types";
import regexDefinitions from "utils/regexDefinitions";
import {hasStringValue} from "components/common/helpers/string-helpers";
import IconBase from "components/common/icons/IconBase";
import {faTriangleExclamation} from "@fortawesome/pro-light-svg-icons";

function InfoText(
  {
    field,
    errorMessage,
    customMessage,
    successMessage,
    warningMessage,
    hideRegexDefinitionText,
    model,
    fieldName,
  }) {
  if (hasStringValue(errorMessage) === true) {
    return (
      <small className={"danger-red form-text"}>
        <div>{errorMessage}</div>
      </small>
    );
  }

  if (hasStringValue(successMessage) === true) {
    return (
      <small className={"green form-text"}>
        <div>{successMessage}</div>
      </small>
    );
  }

  if (model && field) {
    const warning = model?.getFieldWarning(field?.id);

    if (hasStringValue(warning) === true) {
      return (
        <small className={"warning-text-alt form-text"}>
          <div>
            <IconBase
              icon={faTriangleExclamation}
            />
            {warning}
          </div>
        </small>
      );
    }
  }

  if (hasStringValue(warningMessage) === true) {
    return (
      <span className={"warning-text-alt form-text"}>
        <div>
          <IconBase
            icon={faTriangleExclamation}
          />
          {warningMessage}
        </div>
      </span>
    );
  }

  if (field?.regexDefinitionName != null) {
    const definitionName = field.regexDefinitionName;
    const regexDefinition = regexDefinitions[definitionName];
    const isRequiredFunction = regexDefinition?.isRequiredFunction;

    if (hideRegexDefinitionText !== true && regexDefinition != null && (isRequiredFunction == null || isRequiredFunction(model) === true)) {
      return (
        <small className={"text-muted form-text"}>
          <div>{regexDefinition?.formText}</div>
        </small>
      );
    }
  }

  if (hasStringValue(field?.formText) === true) {
    return (
      <small className={"text-muted form-text"}>
        <div>{field?.formText}</div>
      </small>
    );
  }

  if (customMessage == null) {
    return null;
  }

  return (
    <small className={"text-muted form-text"}>
      <div>{customMessage}</div>
    </small>
  );
}

InfoText.propTypes = {
  field: PropTypes.object,
  errorMessage: PropTypes.string,
  customMessage: PropTypes.any,
  successMessage: PropTypes.string,
  hideRegexDefinitionText: PropTypes.bool,
  model: PropTypes.object,
  fieldName: PropTypes.string,
  warningMessage: PropTypes.string,
};

export default InfoText;
