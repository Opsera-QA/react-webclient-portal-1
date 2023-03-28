import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InfoText from "components/common/inputs/info_text/InfoText";
import {parseError} from "components/common/helpers/error-helpers";
import {InputGroup} from "react-bootstrap";
import { hasStringValue } from "components/common/helpers/string-helpers";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

function TextInputBase(
  {
    fieldName,
    dataObject,
    setDataObject,
    disabled,
    type,
    showLabel,
    inputClasses,
    linkTooltipText,
    detailViewLink,
    infoOverlay,
    setDataFunction,
    name,
    style,
    className,
    error,
    rightSideInputButton,
    inputButtons,
    inputHelpOverlay,
    visible,
    helpTooltipText,
  }) {
  const field = dataObject?.getFieldById(fieldName);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setErrorMessage(error ? parseError(error) : "");
  }, [error]);

  const validateAndSetData = (value) => {
    let newDataObject = dataObject;
    newDataObject.setTextData(fieldName, value);
    setErrorMessage(newDataObject.getFieldError(fieldName));
    setDataObject({...newDataObject});
  };

  const updateValue = (newValue) => {
    if (typeof newValue !== "string") {
      setErrorMessage(`${field?.label} must be a string.`);
      return;
    }

    if (setDataFunction) {
      const newDataObject = setDataFunction(fieldName, newValue);

      if (newDataObject) {
        setErrorMessage(newDataObject?.getFieldError(fieldName));
      }
    }
    else {
      validateAndSetData(newValue);
    }
  };


  const getInputClasses = () => {
    let classes = `form-control`;

    if (hasStringValue(errorMessage) === true) {
      classes += ` border border-danger error-text-alt`;
    }

    if (inputClasses) {
      classes += ` ${inputClasses}`;
    }

    return classes;
  };

  const getErrorStyling = () => {
    if (hasStringValue(errorMessage) === true) {
      return ` error-text-alt`;
    }

    return "";
  };

  const getInputButtons = () => {
    if (inputButtons) {
      return (
        <div className={"d-flex ml-2"}>
          {inputButtons}
        </div>
      );
    }
  };

  const getInputBody = () => {
    return (
      <input
        type={type}
        style={style}
        disabled={disabled}
        name={name}
        value={dataObject.getData(fieldName)}
        onChange={(event) => updateValue(event.target.value)}
        className={getInputClasses()}
        autoComplete={"off"}
      />
    );
  };

  const getInput = () => {
    if (rightSideInputButton != null) {
      return (
        <InputGroup className={"flex-nowrap text-input-with-button"}>
          {getInputBody()}
          <InputGroup.Append>
            {rightSideInputButton}
          </InputGroup.Append>
        </InputGroup>
      );
    }

    return (
      <div className={"d-flex" + getErrorStyling()}>
        {getInputBody()}
        {getInputButtons()}
      </div>
    );
  };

  if (field == null || visible === false) {
    console.log("field is: " + JSON.stringify(field));
    console.log("visible is: " + JSON.stringify(visible));
    return null;
  }

  return (
    <InputContainer className={className} fieldName={fieldName}>
      <InputLabel
        model={dataObject}
        showLabel={showLabel}
        field={field}
        linkTooltipText={linkTooltipText}
        detailViewLink={detailViewLink}
        infoOverlay={infoOverlay}
        inputHelpOverlay={inputHelpOverlay}
        hasError={hasStringValue(errorMessage) === true}
        helpTooltipText={helpTooltipText}
      />
      {getInput()}
      <InfoText
        model={dataObject}
        fieldName={fieldName}
        field={field}
        errorMessage={errorMessage}
      />
    </InputContainer>
  );
}

TextInputBase.propTypes = {
  type: PropTypes.string,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  inputPopover: PropTypes.object,
  inputClasses: PropTypes.string,
  disabled: PropTypes.bool,
  showLabel: PropTypes.bool,
  linkTooltipText: PropTypes.string,
  detailViewLink: PropTypes.string,
  infoOverlay: PropTypes.any,
  inputHelpOverlay: PropTypes.any,
  setDataFunction: PropTypes.func,
  name: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  rightSideInputButton: PropTypes.object,
  inputButtons: PropTypes.any,
  visible: PropTypes.bool,
  helpTooltipText: PropTypes.string,
};

export default TextInputBase;