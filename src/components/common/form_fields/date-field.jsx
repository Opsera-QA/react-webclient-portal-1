import React, { useState } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";

function DateField({ field, label, value, dateFormat }) {
  return (
    <>
      <div className="my-2">
      {field ?  <><div className="custom-text-input"><label className="text-muted mr-1">{field.label}:</label><span> {value && format(new Date(value), dateFormat)}</span></div></>
      // TODO: When everything is equipped with fields, get rid of this
        :   <><div className="custom-text-input"><label className="text-muted mr-1">{label}:</label><span> {value && format(new Date(value), dateFormat)}</span></div></>}
      </div>
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