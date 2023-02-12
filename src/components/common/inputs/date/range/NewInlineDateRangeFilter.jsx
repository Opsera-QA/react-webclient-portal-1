import React from "react";
import PropTypes from "prop-types";
import NewDateRangeInput from "components/common/inputs/date/range/NewDateRangeInput";

export default function NewInlineDateRangeFilter(
  {
    model,
    setModel,
    loadDataFunction,
    fieldName,
    key,
    titleText,
  }) {
  const setDataFunction = (fieldName, newValue) => {
    model.setData(fieldName, newValue);
    loadDataFunction(model);
  };

  return (
    <NewDateRangeInput
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      titleText={titleText}
      key={key}
    />
  );
}

NewInlineDateRangeFilter.propTypes = {
  fieldName: PropTypes.string,
  key: PropTypes.string,
  model: PropTypes.object,
  loadDataFunction: PropTypes.func,
  setModel: PropTypes.func,
  titleText: PropTypes.string,
};