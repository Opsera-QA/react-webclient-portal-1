import React from "react";
import PropTypes from "prop-types";
import DateFieldBase from "./DateFieldBase";

function DateTimeField({ fieldName, dataObject, className }) {
  return (
    <DateFieldBase
      dataObject={dataObject}
      fieldName={fieldName}
      dateFormat={"yyyy-MM-dd', 'hh:mm a"}
      className={className}
    />
  );
}

DateTimeField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  className: PropTypes.string
};

export default DateTimeField;