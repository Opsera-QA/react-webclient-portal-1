import React from "react";
import PropTypes from "prop-types";
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";

function StandaloneDatePickerInput({ value, setDataFunction, disabled, showDate, showTime, minDate, maxDate, dropUp }) {
  Moment.locale("en");
  momentLocalizer();

  return (
    <DateTimePicker
      date={showDate}
      min={minDate}
      max={maxDate}
      time={showTime}
      disabled={disabled}
      dropUp={dropUp}
      value={new Date(value)}
      onChange={setDataFunction}
      defaultValue={new Date()}
    />
  );
}

StandaloneDatePickerInput.propTypes = {
  value: PropTypes.any,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  showDate: PropTypes.bool,
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