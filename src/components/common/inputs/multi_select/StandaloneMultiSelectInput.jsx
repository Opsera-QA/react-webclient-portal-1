import React from "react";
import PropTypes from "prop-types";
import Multiselect from "react-widgets/Multiselect";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

const getClassNames = (className, hasErrorState, hasWarningState) => {
  const parsedClassName = DataParsingHelper.parseString(className, "");

  if (hasErrorState === true) {
    return `select-input-error ${parsedClassName}`;
  }

  if (hasWarningState === true) {
    return `select-input-warning ${parsedClassName}`;
  }

  return parsedClassName;
};

function StandaloneMultiSelectInput(
  {
    value,
    groupBy,
    disabled,
    selectOptions,
    hasWarningState,
    valueField,
    textField,
    placeholderText,
    setDataFunction,
    busy,
    createOptionFunction,
    allowCreate,
    onToggleFunction,
    hasErrorState,
    className,
    lazyLoad,
    manualEntry,
    onSearchFunction,
    onClickFunction,
  }) {
  return (
    <div
      className={"custom-multiselect-input"}
      onClick={onClickFunction}
    >
      <Multiselect
        className={getClassNames(className, hasErrorState, hasWarningState)}
        data={selectOptions}
        dataKey={valueField}
        textField={textField}
        busy={busy}
        filter={"contains"}
        allowCreate={allowCreate}
        groupBy={groupBy}
        onToggle={onToggleFunction}
        onSearch={onSearchFunction}
        value={value}
        onCreate={createOptionFunction}
        placeholder={placeholderText}
        disabled={disabled || (manualEntry !== true && lazyLoad !== true && (!Array.isArray(selectOptions) || selectOptions?.length === 0)) || busy}
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
  className: PropTypes.string,
  hasErrorState: PropTypes.bool,
  hasWarningState: PropTypes.bool,
  lazyLoad: PropTypes.bool,
  manualEntry: PropTypes.bool,
  onSearchFunction: PropTypes.func,
  onClickFunction: PropTypes.func,
};

export default StandaloneMultiSelectInput;