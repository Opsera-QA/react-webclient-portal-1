import React from "react";
import PropTypes from "prop-types";
import DateTimeInputBase from "components/common/inputs/date/DateTimeInputBase";

export default function DateInput(
  {
    fieldName,
    model,
    setModel,
    setDataFunction,
    disabled,
    defaultToNull,
  }) {
  return (
    <DateTimeInputBase
      dataObject={model}
      setDataObject={setModel}
      fieldName={fieldName}
      disabled={disabled}
      setDataFunction={setDataFunction}
      showTime={false}
      defaultToNull={defaultToNull}
    />
  );
}

DateInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  defaultToNull: PropTypes.bool,
};

DateInput.defaultProps = {
  defaultToNull: true,
};