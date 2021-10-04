import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

function PipelineStateBase({ icon, innerText, statusText, className }) {
  return (
    <div className={className + " d-flex justify-content-end"}>
      <TooltipWrapper innerText={innerText}>
        <div>
          <FontAwesomeIcon size="lg" icon={icon} fixedWidth className={statusText === "Running" ? "fa-spin mr-1" : "mr-1"}/>
          <span className="text-muted ">{statusText}</span>
        </div>
      </TooltipWrapper>
    </div>
  );
}

PipelineStateBase.propTypes = {
  icon: PropTypes.object,
  innerText: PropTypes.string,
  statusText: PropTypes.string,
  className: PropTypes.string
};

export default PipelineStateBase;