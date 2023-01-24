import React from "react";
import PropTypes from "prop-types";
import PipelineWorkflowItemFieldBase
  from "components/workflow/pipelines/pipeline_details/workflow/fields/PipelineWorkflowItemFieldBase";
import {faDraftingCompass} from "@fortawesome/pro-light-svg-icons";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import PipelineIdFieldBase from "components/common/fields/pipelines/PipelineIdFieldBase";

export default function PipelineWorkflowStepChildPipelineField(
  {
    step,
  }) {
  const childPipelineId = DataParsingHelper.parseNestedMongoDbId(step, "tool.configuration.pipelineId");

  if (isMongoDbId(childPipelineId) !== true) {
    return null;
  }

  return (
    <PipelineWorkflowItemFieldBase
      className={"pl-1 pt-1"}
      icon={faDraftingCompass}
      label={"Child Pipeline"}
      value={<PipelineIdFieldBase pipelineId={childPipelineId} />}
    />
  );
}

PipelineWorkflowStepChildPipelineField.propTypes = {
  step: PropTypes.object,
};
