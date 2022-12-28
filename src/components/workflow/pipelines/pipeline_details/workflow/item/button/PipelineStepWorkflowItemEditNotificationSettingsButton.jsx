import React from "react";
import PropTypes from "prop-types";
import {faEnvelope} from "@fortawesome/pro-light-svg-icons";
import OverlayIconBase from "components/common/icons/OverlayIconBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";
import PipelineStepNotificationConfigurationOverlay
  from "components/workflow/plan/step/notifications/PipelineStepNotificationConfigurationOverlay";

export default function PipelineStepWorkflowItemEditNotificationSettingsButton(
  {
    editingWorkflow,
    step,
    pipeline,
    pipelineStatus,
  }) {
  const {
    toastContext,
    userData,
  } = useComponentStateReference();

  const editStepNotificationConfiguration = async (pipelineStep) => {
    toastContext.showOverlayPanel(
      <PipelineStepNotificationConfigurationOverlay
        pipeline={pipeline}
        pipelineId={pipeline?._id}
        pipelineStep={pipelineStep}
      />
    );
  };

  if (editingWorkflow === true || step == null || PipelineRoleHelper.canViewStepConfiguration(userData, pipeline) !== true) {
    return null;
  }

  if (pipelineStatus === "running" || pipelineStatus === "paused") {
    return (
      <OverlayIconBase
        icon={faEnvelope}
        className={"text-muted mx-1"}
        overlayBody={"Cannot access Notification settings while a Pipeline is running"}
      />
    );
  }

  return (
    <OverlayIconBase
      icon={faEnvelope}
      className={"text-muted mx-1"}
      onClickFunction={editStepNotificationConfiguration}
      overlayBody={"Configure Step Notification and Approval Rules"}
    />
  );
}

PipelineStepWorkflowItemEditNotificationSettingsButton.propTypes = {
  editingWorkflow: PropTypes.bool,
  pipeline: PropTypes.object,
  step: PropTypes.object,
  pipelineStatus: PropTypes.string,
};