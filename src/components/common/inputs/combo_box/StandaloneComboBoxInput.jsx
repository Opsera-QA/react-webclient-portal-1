import React from "react";
import PropTypes from "prop-types";
import ComboBox from "react-widgets/Combobox";

function StandaloneComboBoxInput(
  {
    value,
    groupBy,
    selectOptions,
    valueField,
    textField,
    placeholderText,
    setDataFunction,
    busy,
    disabled
  }) {

  return (
    <ComboBox
      data={selectOptions}
      dataKey={valueField}
      textField={textField}
      groupBy={groupBy}
      value={value}
      filter={"contains"}
      busy={busy}
      placeholder={placeholderText}
      onChange={(newValue) => setDataFunction(newValue)}
      disabled={disabled}
    />
  );
}

StandaloneComboBoxInput.propTypes = {
  selectOptions: PropTypes.array.isRequired,
  value: PropTypes.any,
  groupBy: PropTypes.string,
  valueField: PropTypes.string,
  textField: PropTypes.string,
  placeholderText: PropTypes.string,
  setDataFunction: PropTypes.func,
  busy: PropTypes.bool,
  disabled: PropTypes.bool
};

export default StandaloneComboBoxInput;