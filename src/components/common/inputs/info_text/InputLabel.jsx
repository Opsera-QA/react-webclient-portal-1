import React from "react";
import PropTypes from "prop-types";

function InputLabel({ field, inputPopover }) {
  const getFormattedLabel = () => {
    return (<label><span>{field.label}{field.isRequired ? <span className="danger-red">*</span> : null}</span></label>);
  };

  if (inputPopover) {
    return (
     <div className="d-flex justify-content-between">
       <div>{getFormattedLabel()}</div>
       <div>{inputPopover}</div>
     </div>
    )
  }

  return (getFormattedLabel());
}

InputLabel.propTypes = {
  field: PropTypes.object,
  inputPopover: PropTypes.object
};

export default InputLabel;