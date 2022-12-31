import React from "react";
import PropTypes from "prop-types";
import {
  faIdBadge,
  faToolbox, faCodeBranch
} from "@fortawesome/pro-light-svg-icons";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {toolIdentifierConstants} from "components/admin/tools/identifiers/toolIdentifier.constants";
import PipelineWorkflowItemActionField
  from "components/workflow/pipelines/pipeline_details/workflow/fields/PipelineWorkflowItemActionField";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import PipelineWorkflowItemFieldBase
  from "components/workflow/pipelines/pipeline_details/workflow/fields/PipelineWorkflowItemFieldBase";

// TODO: Implement
export default function PipelineStepWorkflowItemBottomActionBar(
  {
    pipeline,
    step,
    loadPipeline,
  }) {
  const isToolSet = DataParsingHelper.parseNestedString(step, "tool.tool_identifier") !== false;

  if (pipeline == null || step == null || isToolSet !== true) {
    return null;
  }

  return null;
}

PipelineStepWorkflowItemBottomActionBar.propTypes = {
  pipeline: PropTypes.object,
  step: PropTypes.object,
  toolIdentifier: PropTypes.object,
  loadPipeline: PropTypes.func,
};