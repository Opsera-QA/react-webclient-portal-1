import React from "react";
import PropTypes from "prop-types";
import DropdownList from "react-widgets/lib/DropdownList";

function StandaloneSelectInputBase(
  {
    groupBy, selectOptions, valueField, textField, placeholderText,
    busy, disabled, onSearch, value, setDataFunction
}) {
  return (
    <DropdownList
      data={selectOptions}
      valueField={valueField}
      textField={textField}
      groupBy={groupBy}
      value={value}
      filter={"contains"}
      busy={busy}
      placeholder={placeholderText}
      onChange={(newValue) => setDataFunction(newValue)}
      disabled={disabled || !Array.isArray(selectOptions) || selectOptions.length === 0}
      onSearch={onSearch}
    />
  );
}

StandaloneSelectInputBase.propTypes = {
  selectOptions: PropTypes.array.isRequired,
  groupBy: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  valueField: PropTypes.string,
  textField: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  placeholderText: PropTypes.string,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  busy: PropTypes.bool,
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
  value: PropTypes.string,
  onSearch: PropTypes.func,
};

StandaloneSelectInputBase.defaultProps = {
  placeholderText: "Select One"
};

export default StandaloneSelectInputBase;