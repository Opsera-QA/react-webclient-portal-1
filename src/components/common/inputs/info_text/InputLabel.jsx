import React from "react";
import PropTypes from "prop-types";

function InputLabel({ field }) {
  return (<label><span>{field.label}{field.isRequired ? <span className="danger-red">*</span> : null}</span></label>);
}

InputLabel.propTypes = {
  field: PropTypes.object,
};

export default InputLabel;