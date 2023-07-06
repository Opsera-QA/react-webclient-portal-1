import {faCheckCircle, faExclamationCircle} from "@fortawesome/pro-light-svg-icons";

export const externalRestApiIntegrationStepHelper = {};

externalRestApiIntegrationStepHelper.getLabelForRuleEvaluationStatus = (status) => {
  switch (status) {
    case "success":
      return "Success";
    case "failure":
      return "Failure";
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
      return faExclamationCircle;
    default:
      return null;
  }
};