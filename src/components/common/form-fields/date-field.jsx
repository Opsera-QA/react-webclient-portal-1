import React, { useState } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";

function DateField({ field, label, value, dateFormat }) {
  return (
    <>
      {field ?  <><span className="text-muted mr-1">{field.label}:</span><span> {value && format(new Date(value), dateFormat)}</span></>
      // TODO: When everything is equipped with fields, get rid of this
        :   <><span className="text-muted mr-1">{label}:</span><span> {value && format(new Date(value), dateFormat)}</span></>}
    </>
  );
}

DateField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  field: PropTypes.object,
  dateFormat: PropTypes.string
};

DateField.defaultProps = {
  dateFormat: "yyyy-MM-dd"
};

export default DateField;