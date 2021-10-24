import React from "react";
import PropTypes from "prop-types";
import Multiselect from "react-widgets/Multiselect";

function StandaloneMultiSelectInput(
  {
    value,
    groupBy,
    disabled,
    selectOptions,
    valueField,
    textField,
    placeholderText,
    setDataFunction,
    busy,
    createOptionFunction,
    allowCreate,
    onToggleFunction,
  }) {

  return (
    <div className={"custom-multiselect-input"}>
      <Multiselect
        data={selectOptions}
        dataKey={valueField}
        textField={textField}
        busy={busy}
        filter={"contains"}
        allowCreate={allowCreate}
        groupBy={groupBy}
        onToggle={onToggleFunction}
        value={value}
        onCreate={createOptionFunction}
        placeholder={placeholderText}
        disabled={disabled || !Array.isArray(selectOptions) || selectOptions?.length === 0 || busy}
        onChange={setDataFunction}
      />
    </div>
  );
}

StandaloneMultiSelectInput.propTypes = {
  selectOptions: PropTypes.array,
  groupBy: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  value: PropTypes.any,
  valueField: PropTypes.string,
  textField: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  placeholderText: PropTypes.string,
  setDataFunction: PropTypes.func,
  busy: PropTypes.bool,
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
  createOptionFunction: PropTypes.func,
  allowCreate: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  onToggleFunction: PropTypes.func,
};

export default StandaloneMultiSelectInput;