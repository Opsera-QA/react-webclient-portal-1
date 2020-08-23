import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import TooltipWrapper from "../../common/tooltip/tooltipWrapper";

function PipelineStatus({ icon, innerText, statusText }) {
  return (
    <>
      <TooltipWrapper innerText={innerText}>
        <FontAwesomeIcon style={{"fontSize": "30px"}} icon={icon} className={statusText === "Running" ? "fa-spin mr-2" : "mr-2"}/>
      </TooltipWrapper>
      <span className="mt-1 float-right">{statusText}</span>
    </>
  );
}

PipelineStatus.propTypes = {
  icon: PropTypes.object,
  innerText: PropTypes.string,
  statusText: PropTypes.string
};

export default PipelineStatus;