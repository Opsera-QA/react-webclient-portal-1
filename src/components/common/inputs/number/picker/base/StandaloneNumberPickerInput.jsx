import React from "react";
import PropTypes from "prop-types";
import NumberPicker from "react-widgets/NumberPicker";

export const formatTypes = {
  percent: '%'
};

function StandaloneNumberPickerInput(
  {
    value,
    disabled,
    placeholderText,
    formatType,
    setDataFunction,
    defaultValue,
    minimum,
    maximum,
    handleKeyPressFunction,
    incrementValue,
  }) {

  if (setDataFunction == null) {
    return null;
  }

  return (
    <NumberPicker
      placeholder={placeholderText}
      disabled={disabled}
      value={value}
      defaultValue={defaultValue}
      className="max-content-width"
      onKeyDown={handleKeyPressFunction}
      onChange={(newValue) => setDataFunction(newValue)}
      min={typeof minimum === "number" ? minimum : undefined}
      max={typeof maximum === "number" ? maximum : undefined}
      format={formatType && formatTypes[formatType] != null ? formatTypes[formatType] : undefined}
      step={incrementValue}
    />
  );
}

StandaloneNumberPickerInput.propTypes = {
  placeholderText: PropTypes.string,
  value: PropTypes.number,
  disabled: PropTypes.any,
  formatType: PropTypes.string,
  defaultValue: PropTypes.any,
  setDataFunction: PropTypes.func.isRequired,
  minimum: PropTypes.number,
  maximum: PropTypes.number,
  handleKeyPressFunction: PropTypes.func,
  incrementValue: PropTypes.number,
};

StandaloneNumberPickerInput.defaultProps = {
  defaultValue: null,
};

export default StandaloneNumberPickerInput;