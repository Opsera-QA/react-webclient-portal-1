import React from "react";
import PropTypes from "prop-types";
import DateTimeRangeInputBase from "components/common/inputs/date/DateTimeRangeInputBase";

export default function DateTimeRangeFilterInput(
  {
    setDataFunction,
    model,
    setModel,
    disabled,
    className,
    stacked,
    startDateFieldName,
    endDateFieldName,
  }) {
  return (
    <DateTimeRangeInputBase
      model={model}
      setModel={setModel}
      disabled={disabled}
      setDataFunction={setDataFunction}
      fromFieldName={startDateFieldName}
      toFieldName={endDateFieldName}
      stacked={stacked}
      className={className}
      defaultToNull={true}
      showTime={false}
      addTimezoneDifference={true}
    />
  );
}

DateTimeRangeFilterInput.propTypes = {
  startDateFieldName: PropTypes.string,
  endDateFieldName: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  stacked: PropTypes.bool,
  defaultToNull: PropTypes.bool,
};

DateTimeRangeFilterInput.defaultProps = {
  startDateFieldName: "startDate",
  endDateFieldName: "endDate",
};
