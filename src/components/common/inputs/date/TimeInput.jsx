import React from "react";
import PropTypes from "prop-types";
import DateTimeInputBase from "components/common/inputs/date/DateTimeInputBase";

// TODO: This isn't used anywhere, so it WILL need tweaking if we want to somehow just save time without an entire date.
//  Let me know and I will adjust it. - Noah
function TimeInput({ fieldName, dataObject, setDataObject, disabled, minDate, maxDate, setDataFunction, disableLabel, showDate, showTime }) {
  return (
    <DateTimeInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      minDate={minDate}
      maxDate={maxDate}
      showDate={showDate}
      showTime={showTime}
      disabled={disabled}
      setDataFunction={setDataFunction}
      disableLabel={disableLabel}
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
  setDataFunction: PropTypes.func,
  disableLabel: PropTypes.bool,
  showDate: PropTypes.bool,
  showTime: PropTypes.bool
};

export default TimeInput;