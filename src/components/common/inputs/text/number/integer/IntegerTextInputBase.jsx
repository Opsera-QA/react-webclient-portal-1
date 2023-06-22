import React from "react";
import PropTypes from "prop-types";
import regexDefinitions from "utils/regexDefinitions";
import {matchesRegex} from "utils/helpers";
import TextInputBase from "components/common/inputs/text/TextInputBase";

export default function IntegerTextInputBase(
  {
    value,
    disabled,
    setDataFunction,
    className,
    mustBePositive,
    model,
    setModel,
    showLabel,
    fieldName,
  }) {
  const validateAndSetData = (event) => {
    const newValue = event.target.value.replace(/\D/g, "");

    if (newValue == null || newValue === "") {
      setDataFunction(null);
      return;
    }

    let parsedValue = parseInt(newValue);
    const numericalFieldRegex = regexDefinitions.numericalField.regex;

    if (typeof parsedValue !== "number") {
      setDataFunction(value);
      return;
    }

    parsedValue = Math.trunc(parsedValue);

    if (!matchesRegex(numericalFieldRegex, parsedValue)) {
      setDataFunction(value);
      return;
    }

    if (mustBePositive === true && parsedValue < 0) {
      setDataFunction(value);
      return;
    }

    setDataFunction(parsedValue);
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
      // error={errorMessage}
    />
  );
}

IntegerTextInputBase.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  showLabel: PropTypes.bool,
  fieldName: PropTypes.string,
  setDataFunction: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  mustBePositive: PropTypes.bool,
};
