import React from "react";
import PropTypes from "prop-types";
import PipelineTaskSummaryPanelBase
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/PipelineTaskSummaryPanelBase";
import pipelineTaskMetadata
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/pipeline-task-metadata";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import modelHelpers from "components/common/model/modelHelpers";
import UserActionPipelineStepActionSummaryPanel
  from "components/workflow/plan/step/user_actions/step_summary/UserActionPipelineStepActionSummaryPanel";

export default function PipelineUserActionSummaryPanel(
  {
    pipelineTaskData,
    setActiveTab,
  }) {
  const toolIdentifier = pipelineTaskData?.tool_identifier;

  const getSummaryReportPanel = () => {
    switch (toolIdentifier) {
      case toolIdentifierConstants.TOOL_IDENTIFIERS.USER_ACTION:
        return (
          <UserActionPipelineStepActionSummaryPanel
            pipelineTaskModel={modelHelpers.parseObjectIntoModel(pipelineTaskData, pipelineTaskMetadata)}
            setActiveTab={setActiveTab}
          />
        );
      default:
        return (
          <PipelineTaskSummaryPanelBase
            pipelineTaskData={modelHelpers.parseObjectIntoModel(pipelineTaskData, pipelineTaskMetadata)}
            setActiveTab={setActiveTab}
          />
        );
    }
  };

  return (getSummaryReportPanel());
}


PipelineUserActionSummaryPanel.propTypes = {
  pipelineTaskData: PropTypes.object,
  setActiveTab: PropTypes.func,
};