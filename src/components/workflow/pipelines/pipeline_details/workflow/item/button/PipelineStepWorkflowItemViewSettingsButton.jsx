import React from "react";
import PropTypes from "prop-types";
import {faSearchPlus} from "@fortawesome/pro-light-svg-icons";
import OverlayIconBase from "components/common/icons/OverlayIconBase";
import PipelineStepDetailsOverviewOverlay
  from "components/workflow/pipelines/overview/step/PipelineStepDetailsOverviewOverlay";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";

export default function PipelineStepWorkflowItemViewSettingsButton(
  {
    editingWorkflow,
    step,
    pipeline,
  }) {
  const {
    toastContext,
    userData,
  } = useComponentStateReference();

  const handleSummaryViewClick = () => {
    toastContext.showOverlayPanel(
      <PipelineStepDetailsOverviewOverlay
        pipelineStepData={step}
      />
    );
  };

  if (editingWorkflow === true || step == null || PipelineRoleHelper.canViewStepConfiguration(userData, pipeline) !== true) {
    return null;
  }

  return (
    <OverlayIconBase
      icon={faSearchPlus}
      className={"text-muted mx-1"}
      onClickFunction={handleSummaryViewClick}
      overlayBody={"View Settings"}
    />
  );
}

PipelineStepWorkflowItemViewSettingsButton.propTypes = {
  editingWorkflow: PropTypes.bool,
  pipeline: PropTypes.object,
  step: PropTypes.object,
};