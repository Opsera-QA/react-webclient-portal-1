import {faCheckCircle, faExclamationCircle} from "@fortawesome/pro-light-svg-icons";

export const externalRestApiIntegrationStepHelper = {};

externalRestApiIntegrationStepHelper.getLabelForRuleEvaluationStatus = (status) => {
  switch (status) {
  case "success":
    return "Success";
  case "failure":
  case "failed":
    return "Failed";
  case "running":
    return "In Progress";
  default:
    return "";
  }
};

externalRestApiIntegrationStepHelper.getStatusIcon = (status) => {
  switch (status) {
  case "success":
    return faCheckCircle;
  case "failure":
  case "failed":
    return faExclamationCircle;
  default:
    return null;
  }
};