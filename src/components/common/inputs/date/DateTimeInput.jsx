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
    />
  );
}

DateTimeInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
  minDate: PropTypes.any,
  maxDate: PropTypes.any,
  dropUp: PropTypes.bool,
  defaultToNull: PropTypes.bool,
};

export default DateTimeInput;