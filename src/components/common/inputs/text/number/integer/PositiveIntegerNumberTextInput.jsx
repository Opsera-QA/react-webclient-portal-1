import React, {useState} from "react";
import PropTypes from "prop-types";
import {matchesRegex} from "utils/helpers";
import regexDefinitions from "utils/regexDefinitions";
import TextInputBase from "components/common/inputs/text/TextInputBase";

function PositiveIntegerTextInput({ fieldName, className, model, setModel, disabled, setDataFunction, showLabel }) {
  const [errorMessage, setErrorMessage] = useState("");

  const validateAndSetData = (newValue) => {
    let parsedValue = Math.trunc(newValue);
    const numericalFieldRegex = regexDefinitions.numericalField.regex;

    if (typeof parsedValue !== "number") {
      setErrorMessage("Not a Number");
      parsedValue = model.getData(fieldName);
    }

    if (!matchesRegex(numericalFieldRegex, parsedValue)) {
      setErrorMessage("Only Integers or 0 Allowed");
      parsedValue = model.getData(fieldName);
    }

    if (parsedValue < 0) {
      setErrorMessage("Only Positive Integers and 0 Allowed");
      parsedValue = model.getData(fieldName);
    }

    let newDataObject = model;
    newDataObject.setTextData(fieldName, parsedValue);
    setErrorMessage(newDataObject.getFieldError(fieldName));
    setModel({...newDataObject});
    return newDataObject;
  };

  const updateValue = (fieldName, newValue) => {
    if (setDataFunction) {
      setDataFunction(fieldName, newValue);
    }
    else {
      validateAndSetData(newValue);
    }
  };

  return (
    <TextInputBase
      className={className}
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      disabled={disabled}
      setDataFunction={updateValue}
      showLabel={showLabel}
      error={errorMessage}
    />
  );
}

PositiveIntegerTextInput.propTypes = {
  setDataFunction: PropTypes.func,
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  formatType: PropTypes.string,
  showLabel: PropTypes.bool,
  minimum: PropTypes.number,
  maximum: PropTypes.number,
  className: PropTypes.string
};

export default PositiveIntegerTextInput;