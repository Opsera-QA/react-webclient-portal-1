import React from "react";
import PropTypes from "prop-types";
import InputPopover from "components/common/inputs/info_text/InputPopover";

function InputLabel({ field, tooltipBody, clickToOpenTooltip }) {
  const getFormattedLabel = () => {
    return (<label><span>{field.label}{field.isRequired ? <span className="danger-red">*</span> : null}</span></label>);
  };

  if (tooltipBody) {
    return (
     <div className="d-flex justify-content-between">
       <div>{getFormattedLabel()}</div>
       <div>
         <InputPopover trigger={clickToOpenTooltip ? "click" : undefined} tooltipBody={tooltipBody} />
       </div>
     </div>
    )
  }

  return (getFormattedLabel());
}

InputLabel.propTypes = {
  field: PropTypes.object,
  tooltipBody: PropTypes.any,
  clickToOpenTooltip: PropTypes.bool
};

export default InputLabel;