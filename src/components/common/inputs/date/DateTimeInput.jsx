import React from "react";
import PropTypes from "prop-types";

function DateTimeInput({ fieldName, dataObject, setDataObject, disabled }) {
  return (
    <DateTimeInput
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