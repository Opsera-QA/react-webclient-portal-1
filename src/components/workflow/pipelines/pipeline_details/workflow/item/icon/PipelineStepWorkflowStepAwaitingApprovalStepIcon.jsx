import React from "react";
import PropTypes from "prop-types";
import {faFlag} from "@fortawesome/pro-light-svg-icons";
import OverlayIconBase from "components/common/icons/OverlayIconBase";

export default function PipelineStepWorkflowStepAwaitingApprovalStepIcon(
  {
    pipelineStepState,
    className,
  }) {
  if (pipelineStepState !== "paused") {
    return null;
  }

  return (
    <OverlayIconBase
      overlayBody={"Approval of this step is required to proceed. Only Pipeline Administrators and Managers (via Pipeline Access Rules) are permitted to perform this action."}
      icon={faFlag}
      iconStyling={{ cursor: "help", }}
      className={className}
    />
  );
}

PipelineStepWorkflowStepAwaitingApprovalStepIcon.propTypes = {
  pipelineStepState: PropTypes.string,
  className: PropTypes.string,
};
