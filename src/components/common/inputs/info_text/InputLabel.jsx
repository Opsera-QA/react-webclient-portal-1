import React from "react";
import PropTypes from "prop-types";

function InputLabel({ field, inputPopover, className, showLabel }) {
  const getFormattedLabel = () => {
    return (<label><span>{field?.label}{field?.isRequired ? <span className="danger-red">*</span> : null}</span></label>);
  };

  if (showLabel === false) {
    return null;
  }

  if (inputPopover) {
    return (
     <div className="d-flex justify-content-between">
       <div>{getFormattedLabel()}</div>
       <div>{inputPopover}</div>
     </div>
    );
  }

  return (
    <div className={className}>
      {getFormattedLabel()}
    </div>
  );
}

InputLabel.propTypes = {
  field: PropTypes.object,
  inputPopover: PropTypes.object,
  className: PropTypes.string,
  showLabel: PropTypes.bool
};

export default InputLabel;