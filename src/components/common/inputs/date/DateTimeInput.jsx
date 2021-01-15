import React from "react";
import PropTypes from "prop-types";
import DateTimeInputBase from "components/common/inputs/date/DateTimeInputBase";

function DateTimeInput({ fieldName, dataObject, setDataObject, disabled }) {
  return (
    <DateTimeInputBase
      disabled={disabled}
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
    />
  );
}

DateTimeInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool
};

export default DateTimeInput;