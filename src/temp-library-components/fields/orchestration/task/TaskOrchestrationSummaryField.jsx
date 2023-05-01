import PropTypes from "prop-types";
import React from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import OrchestrationSummaryFieldBase
  from "temp-library-components/fields/orchestration/OrchestrationSummaryFieldBase";

export default function TaskOrchestrationSummaryField(
  {
    taskModel,
    className,
  }) {
  const completionTime = taskModel?.getLastRunCompletionTime();
  const status = DataParsingHelper.parseString(taskModel?.getData("status"));

  if (!completionTime || !status) {
    return null;
  }

  return (
    <OrchestrationSummaryFieldBase
      type={"Task"}
      completionTime={completionTime}
      status={status}
      className={className}
    />
  );
}

TaskOrchestrationSummaryField.propTypes = {
  taskModel: PropTypes.object,
  className: PropTypes.string,
};
