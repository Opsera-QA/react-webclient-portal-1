import React from "react";
import PropTypes from "prop-types";
import DateTimeInputBase from "components/common/inputs/date/DateTimeInputBase";

// TODO: Don't use this. Use /time/TimeInputBase. Leaving here until finishing Scheduler with Jim
function TimeInput({ fieldName, dataObject, setDataObject, disabled, minDate, maxDate, setDataFunction }) {
  return (
    <DateTimeInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      minDate={minDate}
      maxDate={maxDate}
      showDate={false}
      disabled={disabled}
      setDataFunction={setDataFunction}
    />
  );
}

TimeInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  minDate: PropTypes.any,
  maxDate: PropTypes.any,
  setDataFunction: PropTypes.func
};

export default TimeInput;