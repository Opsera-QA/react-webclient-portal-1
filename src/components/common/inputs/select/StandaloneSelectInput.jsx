import React from "react";
import PropTypes from "prop-types";
import DropdownList from "react-widgets/DropdownList";

function StandaloneSelectInput(
  {
    groupBy,
    selectOptions,
    valueField,
    textField,
    placeholderText,
    noDataText,
    busy,
    disabled,
    onSearch,
    value,
    setDataFunction,
    defaultValue,
    onCreate,
    allowCreate,
    className,
    onToggle,
    hasErrorState,
  }) {
  const getPlaceholderText = () => {
    if (!Array.isArray(selectOptions)) {
      return ("Error with data format!");
    }

    if (noDataText != null && selectOptions.length === 0) {
      return (noDataText);
    }

    return (placeholderText);
  };

  return (
    <DropdownList
      className={`${hasErrorState ? "select-input-error " : ""}${className}`}
      data={selectOptions}
      dataKey={valueField}
      textField={textField}
      groupBy={groupBy}
      value={value}
      filter={"contains"}
      busy={busy}
      defaultValue={defaultValue}
      onCreate={onCreate}
      onToggle={onToggle}
      placeholder={getPlaceholderText()}
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
  noDataText: PropTypes.string,
  defaultValue: PropTypes.any,
  hasErrorState: PropTypes.bool,
};

StandaloneSelectInput.defaultProps = {
  placeholderText: "Select One"
};

export default StandaloneSelectInput;