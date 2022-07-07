import React from "react";
import PropTypes from "prop-types";
import pipelineTaskMetadata
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/pipeline-task-metadata";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import modelHelpers from "components/common/model/modelHelpers";
import ExternalRestApiIntegrationTaskRunConfigurationSummaryPanel
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/run_configuration/ExternalRestApiIntegrationTaskRunConfigurationSummaryPanel";

export const RUN_CONFIGURATION_SUMMARY_SUPPORTED_TOOL_IDENTIFIERS = [
  toolIdentifierConstants.TOOL_IDENTIFIERS.EXTERNAL_REST_API_INTEGRATION,
];

function PipelineTaskRunConfigurationSummaryPanel({ pipelineTaskData }) {
  const getSummaryPanel = () => {
    const toolIdentifier =
      pipelineTaskData?.api_response?.stepIdentifier
        ? pipelineTaskData?.api_response?.stepIdentifier
        : pipelineTaskData.tool_identifier;

    switch (toolIdentifier) {
      case toolIdentifierConstants.TOOL_IDENTIFIERS.EXTERNAL_REST_API_INTEGRATION:
        return (
          <ExternalRestApiIntegrationTaskRunConfigurationSummaryPanel
            externalRestApiIntegrationStepTaskModel={modelHelpers.parseObjectIntoModel(pipelineTaskData, pipelineTaskMetadata)}
          />
        );
    }
  };

  return (
    <div>
      {getSummaryPanel()}
    </div>
  );
}

PipelineTaskRunConfigurationSummaryPanel.propTypes = {
  pipelineTaskData: PropTypes.object,
};

export default PipelineTaskRunConfigurationSummaryPanel;