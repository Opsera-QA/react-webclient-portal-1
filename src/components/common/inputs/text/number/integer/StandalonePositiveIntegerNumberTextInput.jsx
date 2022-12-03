import React from "react";
import PropTypes from "prop-types";
import regexDefinitions from "utils/regexDefinitions";
import {matchesRegex} from "utils/helpers";

function StandalonePositiveIntegerNumberTextInput({ value, disabled, setDataFunction, className }) {

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

    if (parsedValue < 0) {
      setDataFunction(value);
      return;
    }

    setDataFunction(parsedValue);
  };

  const getInputClasses = () => {
    let classes = `form-control`;

    // if (errorMessage !== "") {
    //   classes += ` border border-danger error-text-alt`;
    // }

    if (className) {
      classes += ` ${className}`;
    }

    return classes;
  };

  const blockInvalidCharacters = (event) => {
    if (['e', 'E', '+', '-'].includes(event.key)) {
      event.preventDefault();
    }
  };

  return (
    <input
      disabled={disabled}
      type={"number"}
      value={value}
      className={getInputClasses()}
      onChange={(event) => validateAndSetData(event)}
      autoComplete="off"
      onKeyDown={blockInvalidCharacters}
    />
  );
}

StandalonePositiveIntegerNumberTextInput.propTypes = {
  setDataFunction: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default StandalonePositiveIntegerNumberTextInput;