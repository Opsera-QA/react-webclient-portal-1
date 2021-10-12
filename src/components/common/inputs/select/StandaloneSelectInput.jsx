import React from "react";
import PropTypes from "prop-types";
import DropdownList from "react-widgets/lib/DropdownList";

function StandaloneSelectInput(
  {
    groupBy,
    selectOptions,
    valueField,
    textField,
    placeholderText,
    busy,
    disabled,
    onSearch,
    value,
    setDataFunction,
    onCreate,
    allowCreate,
    className,
    onToggle,
  }) {
  return (
    <DropdownList
      className={className}
      data={selectOptions}
      valueField={valueField}
      textField={textField}
      groupBy={groupBy}
      value={value}
      filter={"contains"}
      busy={busy}
      onCreate={onCreate}
      onToggle={onToggle}
      placeholder={placeholderText}
      onChange={(newValue) => setDataFunction(newValue)}
      disabled={disabled || !Array.isArray(selectOptions) || selectOptions.length === 0}
      onSearch={onSearch}
      allowCreate={allowCreate}
    />
  );
}

StandaloneSelectInput.propTypes = {
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
  value: PropTypes.any,
  onSearch: PropTypes.func,
  onCreate: PropTypes.func,
  allowCreate: PropTypes.bool,
  className: PropTypes.string,
  onToggle: PropTypes.func,
};

StandaloneSelectInput.defaultProps = {
  placeholderText: "Select One"
};

export default StandaloneSelectInput;