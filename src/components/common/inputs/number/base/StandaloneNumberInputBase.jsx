import React from "react";
import PropTypes from "prop-types";
import NumberPicker from "react-widgets/lib/NumberPicker";
import simpleNumberLocalizer from "react-widgets-simple-number";

export const formatTypes = {
  percent: '%'
};

function StandaloneNumberInputBase({ value, disabled, placeholderText, formatType, setDataFunction, minimum, maximum }) {
  simpleNumberLocalizer();

  if (setDataFunction == null) {
    return null;
  }

  return (
    <NumberPicker
      placeholder={placeholderText}
      disabled={disabled}
      value={value}
      className="max-content-width"
      onChange={(newValue) => setDataFunction(newValue)}
      min={typeof minimum === "number" ? minimum : undefined}
      max={typeof maximum === "number" ? maximum : undefined}
      format={formatType && formatTypes[formatType] != null ? formatTypes[formatType] : undefined}
    />
  );
}

StandaloneNumberInputBase.propTypes = {
  placeholderText: PropTypes.string,
  value: PropTypes.number,
  disabled: PropTypes.bool,
  formatType: PropTypes.string,
  setDataFunction: PropTypes.func.isRequired,
  minimum: PropTypes.number,
  maximum: PropTypes.number,
};

export default StandaloneNumberInputBase;