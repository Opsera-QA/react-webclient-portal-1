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
  status,
  type,
) => {
  const parsedCompletionTime = DataParsingHelper.parseDate(completionTime);
  const parsedStatus = DataParsingHelper.parseString(status);
  const parsedType = DataParsingHelper.parseString(type, "Workflow");

  if (parsedStatus === "running") {
    return `This ${parsedType} is currently running`;
  }

  if (parsedStatus === "paused") {
    return `This ${parsedType} is awaiting user action`;
  }

  if (parsedCompletionTime && parsedStatus) {
    const statusVerb = orchestrationHelper.getStatusLabelVerb(status);

    return `The last run ${statusVerb} ${DateHelper.formatDistanceToNow(parsedCompletionTime, undefined, false, true)}`;
  }
};

orchestrationHelper.getLastRunSummaryForPipelineModel = (pipelineModel) => {
  const pipeline = pipelineModel?.getCurrentData();
  const completed = pipelineModel?.getLastRunCompletionTime();
  const status = DataParsingHelper.parseNestedString(pipeline, "workflow.last_run.status", "unknown");

  return orchestrationHelper.getLastRunSummary("Pipeline", completed, status);
};

orchestrationHelper.getTaskCompletionPercentage = (
  taskStartTime,
  totalAverageDuration,
  lastRunDuration,
  lastFiveRunsDurationAverage,
) => {
  const parsedTaskStartTime = DataParsingHelper.parseDate(taskStartTime);

  if (!parsedTaskStartTime) {
    return;
  }

  const parsedTotalAverageDuration = DataParsingHelper.parseInteger(totalAverageDuration, 0);
  const parsedLastRunDuration = DataParsingHelper.parseInteger(lastRunDuration, 0);
  const parsedLastFiveRunsDurationAverage = DataParsingHelper.parseInteger(lastFiveRunsDurationAverage, 0);
  const highestAverage = Math.max(parsedLastFiveRunsDurationAverage, parsedLastRunDuration, parsedTotalAverageDuration);

  if (!highestAverage) {
    return;
  }

  const now = new Date().getTime();
  const timeDifference = now - parsedTaskStartTime;
  const percentage = (timeDifference / highestAverage) * 100;

  return Math.max(Math.min(percentage, 90), 5);
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

orchestrationHelper.getStatusLabelVerb = (status) => {
  const parsedStatus = DataParsingHelper.parseString(status, "");

  switch (parsedStatus) {
    case "failed":
    case "failure":
      return "failed";
    case "running":
      return "ran";
    case "paused":
      return "paused";
    case "success":
    case "successful":
      return "succeeded";
    case "created":
      return "created";
    default:
      return "stopped";
  }
};
