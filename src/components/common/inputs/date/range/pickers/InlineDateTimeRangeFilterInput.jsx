import React from "react";
import PropTypes from "prop-types";
import DateTimeRangeFilterInput from "components/common/inputs/date/range/pickers/DateTimeRangeFilterInput";

export default function InlineDateTimeRangeFilterInput(
  {
    loadDataFunction,
    model,
    setModel,
    disabled,
    className,
    stacked,
    startDateFieldName,
    endDateFieldName,
  }) {
  const setDataFunction = (fieldName, newValue) => {
    model?.setData(fieldName, newValue);
    model.syncIncompleteDateRange();
    loadDataFunction(model);
  };

  const clearDataFunction = () => {
    model?.setData(startDateFieldName, null);
    model?.setData(endDateFieldName, null);
    loadDataFunction(model);
  };

  return (
    <DateTimeRangeFilterInput
      model={model}
      setModel={setModel}
      disabled={disabled}
      setDataFunction={setDataFunction}
      stacked={stacked}
      className={className}
      startDateFieldName={startDateFieldName}
      endDateFieldName={endDateFieldName}
      clearDataFunction={clearDataFunction}
    />
  );
}

InlineDateTimeRangeFilterInput.propTypes = {
  disabled: PropTypes.bool,
  className: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  loadDataFunction: PropTypes.func,
  stacked: PropTypes.bool,
  startDateFieldName: PropTypes.string,
  endDateFieldName: PropTypes.string,
  syncIncompleteDateRange: PropTypes.bool,
};

InlineDateTimeRangeFilterInput.defaultProps = {
  startDateFieldName: "startDate",
  endDateFieldName: "endDate",
};
