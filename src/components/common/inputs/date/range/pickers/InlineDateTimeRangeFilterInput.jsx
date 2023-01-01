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
    syncDates,
  }) {
  const setDataFunction = (fieldName, newValue) => {
    model?.setData(fieldName, newValue);

    const dateRange = model.getDateRangeFilterObject(syncDates);

    if (dateRange) {
      loadDataFunction(model);
    }
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
  syncDates: PropTypes.bool,
};
