import React from "react";
import PropTypes from "prop-types";
import Moment from "moment";
import DatePicker from "react-widgets/DatePicker";

function StandaloneDatePickerInput({ value, setDataFunction, disabled, showTime, minDate, maxDate, dropUp }) {
  Moment.locale("en");

  return (
    <DatePicker
      min={minDate}
      max={maxDate}
      disabled={disabled}
      dropUp={dropUp}
      value={new Date(value)}
      onChange={setDataFunction}
      defaultValue={new Date()}
      includeTime={showTime}
    />
  );
}

StandaloneDatePickerInput.propTypes = {
  value: PropTypes.any,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  showTime: PropTypes.bool,
  minDate: PropTypes.any,
  maxDate: PropTypes.any,
  dropUp: PropTypes.bool
};

StandaloneDatePickerInput.defaultProps = {
  showDate: true,
  showTime: true
};

export default StandaloneDatePickerInput;