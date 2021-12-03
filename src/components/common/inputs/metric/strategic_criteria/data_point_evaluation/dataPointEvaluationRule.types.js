import {faCheckCircle, faExclamationCircle, faExclamationTriangle} from "@fortawesome/pro-light-svg-icons";

export const DATA_POINT_EVALUATION_RULE_TYPES = {
  SUCCESS: "success",
  WARNING: "warning",
  FAILURE: "failure",
};

export const DATA_POINT_EVALUATION_RULE_TYPE_LABELS = {
  SUCCESS: "Success",
  WARNING: "Warning",
  FAILURE: "Failure",
};

export const getDataPointEvaluationRuleTypeLabel = (dataPointEvaluationRuleType) => {
  switch (dataPointEvaluationRuleType) {
    case DATA_POINT_EVALUATION_RULE_TYPES.SUCCESS:
      return DATA_POINT_EVALUATION_RULE_TYPE_LABELS.SUCCESS;
    case DATA_POINT_EVALUATION_RULE_TYPES.WARNING:
      return DATA_POINT_EVALUATION_RULE_TYPE_LABELS.WARNING;
    case DATA_POINT_EVALUATION_RULE_TYPES.FAILURE:
      return DATA_POINT_EVALUATION_RULE_TYPE_LABELS.FAILURE;
    default:
      return dataPointEvaluationRuleType;
  }
};

export const SUPPORTED_DATA_POINT_EVALUATION_RULE_TYPES = [
  DATA_POINT_EVALUATION_RULE_TYPES.SUCCESS,
  DATA_POINT_EVALUATION_RULE_TYPES.WARNING,
  DATA_POINT_EVALUATION_RULE_TYPES.FAILURE,
];

export const getDataPointEvaluationRuleTypeIcon = (dataPointEvaluationRuleType) => {
  switch (dataPointEvaluationRuleType) {
    case DATA_POINT_EVALUATION_RULE_TYPES.SUCCESS:
      return faCheckCircle;
    case DATA_POINT_EVALUATION_RULE_TYPES.WARNING:
      return faExclamationTriangle;
    case DATA_POINT_EVALUATION_RULE_TYPES.FAILURE:
      return faExclamationCircle;
  }
};

export const getFormattedDataPointEvaluationText = (dataPointEvaluationRule) => {
  switch (dataPointEvaluationRule) {
    case DATA_POINT_EVALUATION_RULE_TYPES.SUCCESS:
      return faCheckCircle;
    case DATA_POINT_EVALUATION_RULE_TYPES.WARNING:
      return faExclamationTriangle;
    case DATA_POINT_EVALUATION_RULE_TYPES.FAILURE:
      return faExclamationCircle;
  }
};