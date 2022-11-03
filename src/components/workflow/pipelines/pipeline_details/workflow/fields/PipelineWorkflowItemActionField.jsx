import React from "react";
import PropTypes from "prop-types";
import PipelineWorkflowItemFieldBase
  from "components/workflow/pipelines/pipeline_details/workflow/fields/PipelineWorkflowItemFieldBase";
import { faBallotCheck, faFileCheck } from "@fortawesome/pro-light-svg-icons";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import PipelineWorkflowItemPipelineInstructionsField
  from "components/workflow/pipelines/pipeline_details/workflow/acknowledgement/PipelineWorkflowItemPipelineInstructionsField";

const PIPELINE_ACTIONS_SUPPORTED_TOOL_IDENTIFIERS = [
  toolIdentifierConstants.TOOL_IDENTIFIERS.USER_ACTION,
];

export default function PipelineWorkflowItemActionField(
  {
    pipelineStep,
    pipelineId,
  }) {
  const toolIdentifier = DataParsingHelper.parseNestedString(pipelineStep, "tool.tool_identifier", "");

  const getValueField = () => {
    switch (toolIdentifier) {
      case toolIdentifierConstants.TOOL_IDENTIFIERS.USER_ACTION:
        return (
          <PipelineWorkflowItemPipelineInstructionsField
            pipelineStep={pipelineStep}
            pipelineId={pipelineId}
          />
        );
      default:
        return null;
    }
  };

  if (PIPELINE_ACTIONS_SUPPORTED_TOOL_IDENTIFIERS.includes(toolIdentifier) !== true) {
    return null;
  }

  return (
    <PipelineWorkflowItemFieldBase
      className={"pl-1 pt-1"}
      icon={faFileCheck}
      label={"Action"}
      value={getValueField()}
    />
  );
}

PipelineWorkflowItemActionField.propTypes = {
  pipelineStep: PropTypes.object,
  pipelineId: PropTypes.string,
};