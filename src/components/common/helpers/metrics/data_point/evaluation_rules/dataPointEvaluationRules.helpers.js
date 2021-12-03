import {objectHelpers} from "components/common/helpers/object/object.helpers";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {numberHelpers} from "components/common/helpers/number/number.helpers";
import {DATA_POINT_EVALUATION_TRIGGER_FILTER_TYPES} from "components/common/inputs/metric/strategic_criteria/data_point_evaluation/row/dataPointEvaluationTrigger.types";

export const dataPointEvaluationRulesHelpers = {};

dataPointEvaluationRulesHelpers.hasDataPointEvaluationRule = (dataPointEvaluationRules) => {
  return (
    objectHelpers.isObject(dataPointEvaluationRules) === true
    &&
    (
         objectHelpers.isObject(dataPointEvaluationRules?.success_rule) === true
      || objectHelpers.isObject(dataPointEvaluationRules?.warning_rule) === true
      || objectHelpers.isObject(dataPointEvaluationRules?.failure_rule) === true
    )
  );
};

dataPointEvaluationRulesHelpers.isDataEvaluationRuleComplete = (dataPointEvaluationRule) => {
  if (objectHelpers.isObject(dataPointEvaluationRule) !== true) {
    return false;
  }

  const triggerFilter = dataPointEvaluationRule?.trigger_filter;
  const hasTriggerFilter = hasStringValue(triggerFilter);
  const hasPrimaryValue = numberHelpers.hasNumberValue(dataPointEvaluationRule?.primary_trigger_value);
  const hasSecondaryValue = numberHelpers.hasNumberValue(dataPointEvaluationRule?.secondary_trigger_value);
  const requiresSecondaryValue = triggerFilter === DATA_POINT_EVALUATION_TRIGGER_FILTER_TYPES.BETWEEN_INCLUSIVE;

  return (
    hasTriggerFilter === true && hasPrimaryValue === true && (requiresSecondaryValue === false || hasSecondaryValue === true)
  );
};

dataPointEvaluationRulesHelpers.evaluateDataPointEvaluationRule = (rule, value) => {
  if (dataPointEvaluationRulesHelpers.isDataEvaluationRuleComplete(rule) !== true || numberHelpers.hasNumberValue(value) !== true) {
    return false;
  }

  const triggerFilter = rule?.trigger_filter;

  switch (triggerFilter) {
    case DATA_POINT_EVALUATION_TRIGGER_FILTER_TYPES.BETWEEN_INCLUSIVE:
      return numberHelpers.isNumberBetweenInclusive(rule?.primary_trigger_value, rule?.secondary_trigger_value, value);
    case DATA_POINT_EVALUATION_TRIGGER_FILTER_TYPES.EQUAL_TO:
      return numberHelpers.isNumberEqual(rule?.primary_trigger_value, value);
    case DATA_POINT_EVALUATION_TRIGGER_FILTER_TYPES.GREATER_THAN:
      return numberHelpers.isNumberGreaterThan(rule?.primary_trigger_value, value);
    case DATA_POINT_EVALUATION_TRIGGER_FILTER_TYPES.GREATER_THAN_OR_EQUAL_TO:
      return numberHelpers.isNumberGreaterThanOrEqualTo(rule?.primary_trigger_value, value);
    case DATA_POINT_EVALUATION_TRIGGER_FILTER_TYPES.LESS_THAN:
      return numberHelpers.isNumberLessThan(rule?.primary_trigger_value, value);
    case DATA_POINT_EVALUATION_TRIGGER_FILTER_TYPES.LESS_THAN_OR_EQUAL_TO:
      return numberHelpers.isNumberLessThanOrEqualTo(rule?.primary_trigger_value, value);
    default:
      return false;
  }
};