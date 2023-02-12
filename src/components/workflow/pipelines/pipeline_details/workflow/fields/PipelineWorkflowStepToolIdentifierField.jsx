import React from "react";
import PropTypes from "prop-types";
import {toolIdentifierConstants} from "components/admin/tools/identifiers/toolIdentifier.constants";
import PipelineWorkflowItemFieldBase
  from "components/workflow/pipelines/pipeline_details/workflow/fields/PipelineWorkflowItemFieldBase";
import {faToolbox} from "@fortawesome/pro-light-svg-icons";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function PipelineWorkflowStepToolIdentifierField(
  {
    toolIdentifier,
  }) {
  if (toolIdentifier?.identifier == null || toolIdentifier?.identifier === toolIdentifierConstants.TOOL_IDENTIFIERS.JENKINS) {
    return null;
  }

  return (
    <PipelineWorkflowItemFieldBase
      className={"pl-1 pt-1"}
      icon={faToolbox}
      label={"Tool"}
      value={DataParsingHelper.parseString(toolIdentifier?.name, "")}
    />
  );
}

PipelineWorkflowStepToolIdentifierField.propTypes = {
  toolIdentifier: PropTypes.object,
};
