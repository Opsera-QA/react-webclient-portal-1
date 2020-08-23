import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import TooltipWrapper from "../../common/tooltip/tooltipWrapper";

function PipelineStatus({ icon, innerText, statusText }) {
  return (
    <><div className="d-flex justify-content-end">
      <TooltipWrapper innerText={innerText}>
        <FontAwesomeIcon size="lg" icon={icon} className={statusText === "Running" ? "fa-spin mr-2" : "mr-2"}/>
      </TooltipWrapper>
      <div className="text-muted">{statusText}</div>
    </div>
    </>
  );
}

PipelineStatus.propTypes = {
  icon: PropTypes.object,
  innerText: PropTypes.string,
  statusText: PropTypes.string
};

export default PipelineStatus;