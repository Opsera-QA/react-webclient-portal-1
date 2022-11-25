import React from "react";
import PropTypes from "prop-types";
import PipelineTaskSummaryPanelBase
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/PipelineTaskSummaryPanelBase";
import RuntimeSettingsTaskApiResponseSummaryPanel
  from "components/workflow/plan/step/runtime_settings/api_response/RuntimeSettingsTaskApiResponseSummaryPanel";

export default function RuntimeSettingsTaskSummaryPanel({ pipelineTaskModel }) {
  if (pipelineTaskModel == null) {
    return null;
  }

  return (
    <PipelineTaskSummaryPanelBase pipelineTaskData={pipelineTaskModel}>
      <RuntimeSettingsTaskApiResponseSummaryPanel
        apiResponse={pipelineTaskModel?.getData("api_response")}
      />
    </PipelineTaskSummaryPanelBase>
  );
}

RuntimeSettingsTaskSummaryPanel.propTypes = {
  pipelineTaskModel: PropTypes.object,
};
