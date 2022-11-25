import React from "react";
import PropTypes from "prop-types";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineActionControlButtonBase
  from "components/workflow/pipelines/action_controls/PipelineActionControlButtonBase";
import { faFlag } from "@fortawesome/pro-light-svg-icons";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";

export default function PipelineStopButton(
  {
    pipeline,
    handleStopWorkflowClick, // TODO: Move logic in here
    workflowStatus,
  }) {
  const {
    userData,
  } = useComponentStateReference();
  const isRunning = DataParsingHelper.parseNestedString(pipeline, "workflow.last_step.status");
  const isPaused = DataParsingHelper.parseNestedBoolean(pipeline, "workflow.last_step.running.paused");

  if (isPaused === true || isRunning !== "running" || workflowStatus !== "running") {
    return null;
  }

  return (
    <PipelineActionControlButtonBase
      icon={faFlag}
      normalText={"Running"}
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
};
