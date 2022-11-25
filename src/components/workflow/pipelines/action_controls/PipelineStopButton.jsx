import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineActionControlButtonBase
  from "components/workflow/pipelines/action_controls/PipelineActionControlButtonBase";
import { faFlag } from "@fortawesome/pro-light-svg-icons";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";
import {buttonLabelHelper} from "temp-library-components/helpers/label/button/buttonLabel.helper";

export default function PipelineStopButton(
  {
    pipeline,
    handleStopWorkflowClick, // TODO: Move logic in here
    workflowStatus,
    pipelineIsStopping,
  }) {
  const {
    userData,
  } = useComponentStateReference();

  if (workflowStatus !== "running") {
    return null;
  }

  return (
    <PipelineActionControlButtonBase
      icon={faFlag}
      normalText={"Stop"}
      buttonState={pipelineIsStopping === true ? buttonLabelHelper.BUTTON_STATES.BUSY : undefined}
      onClickFunction={handleStopWorkflowClick}
      disabled={PipelineRoleHelper.canStopPipeline(userData, pipeline) !== true}
      variant={"danger"}
    />
  );
}

PipelineStopButton.propTypes = {
  pipeline: PropTypes.object,
  handleStopWorkflowClick: PropTypes.func,
  workflowStatus: PropTypes.string,
  pipelineIsStopping: PropTypes.bool,
};
