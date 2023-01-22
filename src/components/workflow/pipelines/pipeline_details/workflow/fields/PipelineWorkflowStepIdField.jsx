import React from "react";
import PropTypes from "prop-types";
import PipelineWorkflowItemFieldBase
  from "components/workflow/pipelines/pipeline_details/workflow/fields/PipelineWorkflowItemFieldBase";
import {faIdBadge, faToolbox} from "@fortawesome/pro-light-svg-icons";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";

export default function PipelineWorkflowStepIdField(
  {
    step,
  }) {
  const stepId = DataParsingHelper.parseNestedMongoDbId(step, "_id");

  if (isMongoDbId(stepId) !== true) {
    return null;
  }

  return (
    <PipelineWorkflowItemFieldBase
      className={"pl-1 pt-1"}
      icon={faIdBadge}
      label={"ID"}
      value={stepId}
    />
  );
}

PipelineWorkflowStepIdField.propTypes = {
  step: PropTypes.object,
};
