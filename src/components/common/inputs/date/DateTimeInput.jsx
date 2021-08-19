import React from "react";
import PropTypes from "prop-types";
import DateTimeInputBase from "components/common/inputs/date/DateTimeInputBase";

function DateTimeInput({ fieldName, dataObject, setDataObject, disabled, dropUp, minDate, maxDate, setDataFunction }) {
  return (
    <DateTimeInputBase
      disabled={disabled}
      fieldName={fieldName}
      dataObject={dataObject}
      minDate={minDate}
      maxDate={maxDate}
      dropUp={dropUp}
      setDataFunction={setDataFunction}
      setDataObject={setDataObject}
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
  maxDate: PropTypes.any
};

export default DateTimeInput;