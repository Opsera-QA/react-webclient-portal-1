import React, { useState } from "react";
import PropTypes from "prop-types";
import { DateRangePicker } from "react-date-range";
import {STATIC_DATE_RANGES} from "components/common/inputs/date/DateRangeInput";

export default function StandaloneDateRangeInput(
  {
    setDataFunction,
    startDate,
    endDate,
    key,
    months,
  }) {
  const internalDate = useState({
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  });

  return (
    <DateRangePicker
      startDatePlaceholder={"Start Date"}
      endDatePlaceholder={"End Date"}
      onChange={(newValue) => setDataFunction(newValue?.[key])}
      showSelectionPreview={true}
      moveRangeOnFirstSelection={false}
      months={months}
      ranges={[internalDate]}
      staticRanges={STATIC_DATE_RANGES}
      direction={"horizontal"}
      className={"mx-auto"}
    />
  );
}

StandaloneDateRangeInput.propTypes = {
  startDate: PropTypes.any,
  endDate: PropTypes.any,
  key: PropTypes.string,
  setDataFunction: PropTypes.func,
  months: PropTypes.number,
};

StandaloneDateRangeInput.defaultProps = {
  key: "selection",
  months: 1,
};