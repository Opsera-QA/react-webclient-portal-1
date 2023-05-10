import React from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import DateFormatHelper from "@opsera/persephone/helpers/date/dateFormat.helper";

export const orchestrationHelper = {};

orchestrationHelper.getLastRunSummary = (
  type,
  completionTime,
  status
) => {
  const parsedType = DataParsingHelper.parseString(type, "Workflow");
  const parsedCompletionTime = DataParsingHelper.parseDate(completionTime);
  const parsedStatus = DataParsingHelper.parseString(status);

  if (parsedCompletionTime && parsedStatus) {
    return `The last complete run of this ${parsedType} finished on ${DateFormatHelper.formatDateAsTimestampWithoutSeconds(new Date(parsedCompletionTime))} 
         with a status of ${parsedStatus}.`;
  }
};

orchestrationHelper.getLastRunSummaryForPipelineModel = (pipelineModel) => {
  const pipeline = pipelineModel?.getCurrentData();
  const completed = pipelineModel?.getLastRunCompletionTime();
  const status = DataParsingHelper.parseNestedString(pipeline, "workflow.last_run.status", "unknown");

  return orchestrationHelper.getLastRunSummary("Pipeline", completed, status);
};
