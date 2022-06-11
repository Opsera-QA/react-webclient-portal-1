import React from "react";
import PropTypes from "prop-types";
import Moment from "moment";
import DatePicker from "react-widgets/DatePicker";
import {hasDateValue} from "components/common/helpers/date/date.helpers";

function StandaloneDatePickerInput(
  {
    value,
    setDataFunction,
    disabled,
    showTime,
    minDate,
    maxDate,
    dropUp,
    defaultToNull,
    hasError,
  }) {
  Moment.locale("en");

  return (
    <DatePicker
      min={minDate}
      max={maxDate}
      disabled={disabled}
      dropUp={dropUp}
      value={hasDateValue(value) ? new Date(value) : undefined}
      onChange={setDataFunction}
      defaultValue={defaultToNull !== true ? new Date() : undefined} // TODO: Do we want to default to now at all?
      includeTime={showTime}
      className={hasError === true ? "danger-red danger-red-border" : ""}
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
  dropUp: PropTypes.bool,
  defaultToNull: PropTypes.bool,
  hasError: PropTypes.bool,
};

StandaloneDatePickerInput.defaultProps = {
  showDate: true,
  showTime: true,
};

export default StandaloneDatePickerInput;