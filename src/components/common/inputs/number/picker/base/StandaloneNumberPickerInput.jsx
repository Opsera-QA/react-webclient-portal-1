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
    minimum,
    maximum,
    handleKeyPressFunction
  }) {

  if (setDataFunction == null) {
    return null;
  }

  return (
    <NumberPicker
      placeholder={placeholderText}
      disabled={disabled}
      value={value}
      className="max-content-width"
      onKeyDown={handleKeyPressFunction}
      onChange={(newValue) => setDataFunction(newValue)}
      min={typeof minimum === "number" ? minimum : undefined}
      max={typeof maximum === "number" ? maximum : undefined}
      format={formatType && formatTypes[formatType] != null ? formatTypes[formatType] : undefined}
    />
  );
}

StandaloneNumberPickerInput.propTypes = {
  placeholderText: PropTypes.string,
  value: PropTypes.number,
  disabled: PropTypes.bool,
  formatType: PropTypes.string,
  setDataFunction: PropTypes.func.isRequired,
  minimum: PropTypes.number,
  maximum: PropTypes.number,
  handleKeyPressFunction: PropTypes.func,
};

export default StandaloneNumberPickerInput;