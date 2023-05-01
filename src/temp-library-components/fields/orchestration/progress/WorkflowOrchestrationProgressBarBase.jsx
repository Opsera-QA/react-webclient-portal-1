import PropTypes from "prop-types";
import React from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {ProgressBarBase} from "@opsera/react-vanity-set";

const getVariant = (status) => {
  const parsedStatus = DataParsingHelper.parseString(status, "");

  switch (parsedStatus) {
    case "paused":
      return "warning";
    case "failed":
    case "failure":
      return "danger";
    case "success":
    case "successful":
      return "success";
    case "running":
    default:
      return undefined;
  }
};

const getLabel = (status, completionPercentage) => {
  const parsedStatus = DataParsingHelper.parseString(status, "");

  switch (parsedStatus) {
    case "paused":
      return "Awaiting User Response";
    case "failed":
    case "failure":
      return "Failed";
    case "success":
    case "successful":
      return "Successful";
    case "running":
    default:
      return completionPercentage;
  }
};


export default function WorkflowOrchestrationProgressBarBase(
  {
    status,
    completionPercentage,
    className,
  }) {
  const parsedCompletionPercentage = DataParsingHelper.parseNumber(completionPercentage);
  const parsedStatus = DataParsingHelper.parseString(status, "stopped");

  if (parsedStatus === "stopped" || (parsedCompletionPercentage == null && parsedCompletionPercentage !== 0)) {
    return null;
  }

  return (
    <ProgressBarBase
      className={className}
      completionPercentage={completionPercentage}
      variant={getVariant(parsedStatus)}
      isInProgress={parsedStatus === "running"}
      label={getLabel(parsedStatus, parsedCompletionPercentage)}
    />
  );
}

  WorkflowOrchestrationProgressBarBase.propTypes = {
    status: PropTypes.string,
    completionPercentage: PropTypes.number,
    className: PropTypes.string,
  };
