import {faCheckCircle, faExclamationCircle, faExclamationTriangle} from "@fortawesome/pro-light-svg-icons";
import {dataPointEvaluationRulesHelpers} from "components/common/helpers/metrics/data_point/evaluation_rules/dataPointEvaluationRules.helpers";
import {objectHelpers} from "components/common/helpers/object/object.helpers";
import {numberHelpers} from "components/common/helpers/number/number.helpers";
import {DATA_POINT_EVALUATION_TRIGGER_FILTER_TYPES} from "components/common/inputs/metric/strategic_criteria/data_point_evaluation/row/dataPointEvaluationTrigger.types";

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

export const getFormattedDataPointEvaluationText = (dataPointEvaluationRule, dataPointEvaluationRuleType) => {
  if (objectHelpers.isObject(dataPointEvaluationRule) !== true) {
    return `There is no ${getDataPointEvaluationRuleTypeLabel(dataPointEvaluationRuleType)} rule assigned to this data point.`;
  }

  if (dataPointEvaluationRulesHelpers.isDataEvaluationRuleValid(dataPointEvaluationRule) !== true) {
    return `The ${getDataPointEvaluationRuleTypeLabel(dataPointEvaluationRuleType)} rule assigned to this data point is incomplete and will not take effect.`;
  }

  const ruleType = dataPointEvaluationRule?.type;
  const triggerFilter = dataPointEvaluationRule?.trigger_filter;
  const primaryValue = dataPointEvaluationRule?.primary_trigger_value;
  const secondaryValue = dataPointEvaluationRule?.secondary_trigger_value;

  switch (triggerFilter) {
    case DATA_POINT_EVALUATION_TRIGGER_FILTER_TYPES.BETWEEN_INCLUSIVE:
      return `The ${getDataPointEvaluationRuleTypeLabel(ruleType)} rule will trigger when the value is between ${primaryValue} and ${secondaryValue} (inclusive).`;
    case DATA_POINT_EVALUATION_TRIGGER_FILTER_TYPES.EQUAL_TO:
      return `The ${getDataPointEvaluationRuleTypeLabel(ruleType)} rule will trigger when the value is equal to ${primaryValue}.`;
    case DATA_POINT_EVALUATION_TRIGGER_FILTER_TYPES.GREATER_THAN:
      return `The ${getDataPointEvaluationRuleTypeLabel(ruleType)} rule will trigger when the value is greater than ${primaryValue}.`;
    case DATA_POINT_EVALUATION_TRIGGER_FILTER_TYPES.GREATER_THAN_OR_EQUAL_TO:
      return `The ${getDataPointEvaluationRuleTypeLabel(ruleType)} rule will trigger when the value is greater than or equal to ${primaryValue}.`;
    case DATA_POINT_EVALUATION_TRIGGER_FILTER_TYPES.LESS_THAN:
      return `The ${getDataPointEvaluationRuleTypeLabel(ruleType)} rule will trigger when the value is less than ${primaryValue}.`;
    case DATA_POINT_EVALUATION_TRIGGER_FILTER_TYPES.LESS_THAN_OR_EQUAL_TO:
      return `The ${getDataPointEvaluationRuleTypeLabel(ruleType)} rule will trigger when the value is less than or equal to ${primaryValue}.`;
    default:
      return `The ${getDataPointEvaluationRuleTypeLabel(dataPointEvaluationRuleType)} rule assigned to this data point is invalid and will not take effect.`;
  }
};