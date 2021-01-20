import React from "react";
import PropTypes from "prop-types";
import DateFieldBase from "components/common/fields/date/DateFieldBase";

function DateTimeField({ fieldName, dataObject }) {
  return (<DateFieldBase dataObject={dataObject} fieldName={fieldName} dateFormat={"yyyy-MM-dd', 'hh:mm a"} />);
}

DateTimeField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
};

export default DateTimeField;