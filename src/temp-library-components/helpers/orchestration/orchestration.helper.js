import React from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import DateFormatHelper from "@opsera/persephone/helpers/date/dateFormat.helper";
import DateHelper from "@opsera/persephone/helpers/date/date.helper";

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

orchestrationHelper.getLastRunCardSummary = (
  completionTime,
  status
) => {
  const parsedCompletionTime = DataParsingHelper.parseDate(completionTime);
  const parsedStatus = DataParsingHelper.parseString(status);

  if (parsedCompletionTime && parsedStatus) {
    return `The last run ${parsedStatus} ${DateHelper.formatDistanceToNow(parsedCompletionTime, undefined, false, true)}`;
  }
};

orchestrationHelper.getLastRunSummaryForPipelineModel = (pipelineModel) => {
  const pipeline = pipelineModel?.getCurrentData();
  const completed = pipelineModel?.getLastRunCompletionTime();
  const status = DataParsingHelper.parseNestedString(pipeline, "workflow.last_run.status", "unknown");

  return orchestrationHelper.getLastRunSummary("Pipeline", completed, status);
};

orchestrationHelper.getStatusLabel = (status) => {
  const parsedStatus = DataParsingHelper.parseString(status, "");

  switch (parsedStatus) {
    case "failed":
    case "failure":
      return "failed";
    case "running":
      return "running";
    case "paused":
      return "paused";
    case "success":
    case "successful":
      return "successful";
    case "created":
      return "created";
    default:
      return "stopped";
  }
};
