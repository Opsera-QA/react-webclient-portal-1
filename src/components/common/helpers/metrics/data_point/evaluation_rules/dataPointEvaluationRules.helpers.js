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

dataPointEvaluationRulesHelpers.isDataEvaluationRuleValid = (dataPointEvaluationRule) => {
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
  if (dataPointEvaluationRulesHelpers.isDataEvaluationRuleValid(rule) !== true || numberHelpers.hasNumberValue(value) !== true) {
    return false;
  }

  const triggerFilter = rule?.trigger_filter;
  const primaryValue = rule?.primary_trigger_value;
  const secondaryValue = rule?.secondary_trigger_value;

  switch (triggerFilter) {
    case DATA_POINT_EVALUATION_TRIGGER_FILTER_TYPES.BETWEEN_INCLUSIVE:
      return numberHelpers.isNumberBetweenInclusive(primaryValue, secondaryValue, value);
    case DATA_POINT_EVALUATION_TRIGGER_FILTER_TYPES.EQUAL_TO:
      return numberHelpers.isNumberEqual(primaryValue, value);
    case DATA_POINT_EVALUATION_TRIGGER_FILTER_TYPES.GREATER_THAN:
      return numberHelpers.isNumberGreaterThan(primaryValue, value);
    case DATA_POINT_EVALUATION_TRIGGER_FILTER_TYPES.GREATER_THAN_OR_EQUAL_TO:
      return numberHelpers.isNumberGreaterThanOrEqualTo(primaryValue, value);
    case DATA_POINT_EVALUATION_TRIGGER_FILTER_TYPES.LESS_THAN:
      return numberHelpers.isNumberLessThan(primaryValue, value);
    case DATA_POINT_EVALUATION_TRIGGER_FILTER_TYPES.LESS_THAN_OR_EQUAL_TO:
      return numberHelpers.isNumberLessThanOrEqualTo(primaryValue, value);
    default:
      return false;
  }
};