import PropTypes from "prop-types";
import React from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import OrchestrationSummaryFieldBase
  from "temp-library-components/fields/orchestration/pipeline/OrchestrationSummaryFieldBase";

export default function PipelineOrchestrationSummaryField(
  {
    pipeline,
    className,
  }) {
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
  pipeline: PropTypes.object,
  className: PropTypes.string,
};
