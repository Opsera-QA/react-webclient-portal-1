import React from "react";
import PropTypes from "prop-types";
import StepApprovalOverlay from "components/workflow/StepApprovalOverlay";
import PipelineInstructionsAcknowledgementOverlay
from "components/workflow/pipelines/pipeline_details/workflow/acknowledgement/PipelineInstructionsAcknowledgementOverlay";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineHelpers from "components/workflow/pipelineHelpers";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import PipelineActionControlButtonBase
from "components/workflow/pipelines/action_controls/PipelineActionControlButtonBase";
import { faFlag } from "@fortawesome/pro-light-svg-icons";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";
import ServiceNowStepApprovalOverlay 
from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/service_now/ServiceNowStepApprovalOverlay";

export default function PipelineActionControlsUserApprovalButton(
  {
    pipeline,
    workflowStatus,
    setPipelineStarting,
    disabled,
  }) {
  const {
    toastContext,
    userData,
  } = useComponentStateReference();
  const approvalStep = PipelineHelpers.getPendingApprovalStep(pipeline);
  const approvalStepToolIdentifier = PipelineHelpers.getToolIdentifierFromPipelineStep(approvalStep);

  const handleApprovalClick = () => {
    toastContext.showOverlayPanel(
      <StepApprovalOverlay
        pipelineId={pipeline?._id}
        setPipelineStarting={setPipelineStarting}
      />,
    );
  };

  const handleAcknowledgementClick = () => {
    toastContext.showOverlayPanel(
      <PipelineInstructionsAcknowledgementOverlay
        pipelineId={pipeline?._id}
        setPipelineStarting={setPipelineStarting}
      />,
    );
  };

  const handleServiceNowApprovalClick = () => {
    toastContext.showOverlayPanel(
      <ServiceNowStepApprovalOverlay
        pipelineId={pipeline?._id}
        setPipelineStarting={setPipelineStarting}        
      />
    );
  };

  if (workflowStatus !== "paused") {
    return null;
  }

  switch (approvalStepToolIdentifier) {
  case toolIdentifierConstants.TOOL_IDENTIFIERS.USER_ACTION:
    return (
      <PipelineActionControlButtonBase
        icon={faFlag}
        normalText={"Acknowledge Action"}
        tooltipText={"A user action is required before this pipeline can proceed. Click here to see the instructions and complete the task."}
        onClickFunction={handleAcknowledgementClick}
        disabled={disabled}
        variant={"warning"}
      />
    );      
  case toolIdentifierConstants.TOOL_IDENTIFIERS.SERVICE_NOW:
    return (
      <PipelineActionControlButtonBase
        icon={faFlag}
        normalText={"Approve Run"}
        tooltipText={"A user action is required before this pipeline can proceed. Click here to see the instructions and complete the task."}
        onClickFunction={handleServiceNowApprovalClick}
        disabled={disabled}
        variant={"warning"}
      />
    );
  default:
    return (
      <PipelineActionControlButtonBase
        icon={faFlag}
        normalText={"Approve Run"}
        tooltipText={"Approve the current pipeline run in order for it to proceed. Only Pipeline Admins and Managers (via Pipeline Access Rules) are permitted to perform this action."}
        onClickFunction={handleApprovalClick}
        disabled={PipelineRoleHelper.canAuthorizeApprovalGate(userData, pipeline) !== true || disabled === true}
        variant={"warning"}
      />
    );    
  }
}

PipelineActionControlsUserApprovalButton.propTypes = {
  pipeline: PropTypes.object,
  workflowStatus: PropTypes.string,
  setPipelineStarting: PropTypes.func,
  disabled: PropTypes.bool,
};
