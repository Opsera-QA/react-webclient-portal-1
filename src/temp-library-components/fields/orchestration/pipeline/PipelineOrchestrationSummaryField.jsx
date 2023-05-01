import PropTypes from "prop-types";
import React from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import OrchestrationSummaryFieldBase
  from "temp-library-components/fields/orchestration/OrchestrationSummaryFieldBase";

export default function PipelineOrchestrationSummaryField(
  {
    pipelineModel,
    className,
  }) {
  const pipeline = pipelineModel?.getCurrentData();
  const completed = DataParsingHelper.parseNestedDate(pipeline, "workflow.last_run.completed");
  const status = DataParsingHelper.parseNestedString(pipeline, "workflow.last_run.status", "unknown");

  if (!completed) {
    return null;
  }

  return (
    <OrchestrationSummaryFieldBase
      type={"Pipeline"}
      completed={completed}
      status={status}
      className={className}
    />
  );
}

PipelineOrchestrationSummaryField.propTypes = {
  pipelineModel: PropTypes.object,
  className: PropTypes.string,
};
