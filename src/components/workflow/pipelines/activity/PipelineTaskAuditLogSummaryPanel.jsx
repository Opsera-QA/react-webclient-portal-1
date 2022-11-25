import React from "react";
import PropTypes from "prop-types";
import pipelineTaskMetadata
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/pipeline-task-metadata";
import {toolIdentifierConstants} from "components/admin/tools/identifiers/toolIdentifier.constants";
import modelHelpers from "components/common/model/modelHelpers";
import ExternalRestApiIntegrationTaskRunConfigurationSummaryPanel
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/run_configuration/ExternalRestApiIntegrationTaskRunConfigurationSummaryPanel";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {hasStringValue} from "components/common/helpers/string-helpers";

export const AUDIT_LOG_SUMMARY_SUPPORTED_TOOL_IDENTIFIERS = [
  toolIdentifierConstants.TOOL_IDENTIFIERS.RUNTIME_SETTINGS,
];

export default function PipelineTaskAuditLogSummaryPanel({pipelineTaskData}) {
  const toolIdentifier = DataParsingHelper.parseNestedString(pipelineTaskData, "api_response.stepIdentifier", pipelineTaskData.tool_identifier);
  const auditRecordId = DataParsingHelper.parseNestedMongoDbId(pipelineTaskData, "api_response.auditRecordId");

  const getSummaryPanel = () => {
    switch (toolIdentifier) {
      case toolIdentifierConstants.TOOL_IDENTIFIERS.EXTERNAL_REST_API_INTEGRATION:
        return (
          <ExternalRestApiIntegrationTaskRunConfigurationSummaryPanel
            externalRestApiIntegrationStepTaskModel={modelHelpers.parseObjectIntoModel(pipelineTaskData, pipelineTaskMetadata)}
          />
        );
    }
  };

  if (hasStringValue(toolIdentifier) !== true) {
    return null;
  }

  return (
    <div>
      {auditRecordId}
    </div>
  );
}

PipelineTaskAuditLogSummaryPanel.propTypes = {
  pipelineTaskData: PropTypes.object,
};