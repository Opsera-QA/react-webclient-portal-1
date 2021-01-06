import React from "react";
import PropTypes from "prop-types";

// TODO: This should be in /inputs/
function InputLabel({ field }) {
  return (<label><span>{field.label}{field.isRequired ? <span className="danger-red">*</span> : null}</span></label>);
}

InputLabel.propTypes = {
  field: PropTypes.object,
};

export default InputLabel;