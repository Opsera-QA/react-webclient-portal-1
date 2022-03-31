import React from "react";
import PropTypes from "prop-types";
import DateTimeInputBase from "components/common/inputs/date/DateTimeInputBase";

function DateTimeInput(
  {
    fieldName,
    dataObject,
    setDataObject,
    disabled,
    minDate,
    maxDate,
    setDataFunction,
    dropUp,
    defaultToNull,
    clearDataFunction,
    className,
  }) {
  return (
    <DateTimeInputBase
      disabled={disabled}
      fieldName={fieldName}
      dataObject={dataObject}
      minDate={minDate}
      maxDate={maxDate}
      setDataFunction={setDataFunction}
      setDataObject={setDataObject}
      defaultToNull={defaultToNull}
      dropUp={dropUp}
      clearDataFunction={clearDataFunction}
      className={className}
    />
  );
}

DateTimeInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  dropUp: PropTypes.bool,
  setDataFunction: PropTypes.func,
  minDate: PropTypes.any,
  maxDate: PropTypes.any,
  defaultToNull: PropTypes.bool,
  clearDataFunction: PropTypes.func,
  className: PropTypes.string,
};

export default DateTimeInput;