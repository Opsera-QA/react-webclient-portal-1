import {objectHelpers} from "components/common/helpers/object/object.helpers";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {numberHelpers} from "components/common/helpers/number/number.helpers";
import {DATA_POINT_EVALUATION_TRIGGER_FILTER_TYPES} from "components/common/inputs/metric/data_points/strategic_criteria/data_point_evaluation/row/dataPointEvaluationTrigger.types";

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

dataPointEvaluationRulesHelpers.getConflictingRuleError = (dataPointEvaluationRules) => {
  if (objectHelpers.isObject(dataPointEvaluationRules) !== true) {
    return false;
  }

  const successRule = dataPointEvaluationRules?.success_rule;
  const warningRule = dataPointEvaluationRules?.warning_rule;
  const failureRule = dataPointEvaluationRules?.failure_rule;

  if (dataPointEvaluationRulesHelpers.doDataPointEvaluationRulesConflict(successRule, warningRule) === true) {
    return "Success Rule and Warning Rule overlap. Warning Rule will take precedence in this scenario.";
  }

  if (dataPointEvaluationRulesHelpers.doDataPointEvaluationRulesConflict(successRule, failureRule) === true) {
    return "Success Rule and Failure Rule overlap. Failure Rule will take precedence in this scenario.";
  }

  if (dataPointEvaluationRulesHelpers.doDataPointEvaluationRulesConflict(warningRule, failureRule) === true) {
    return "Warning Rule and Failure Rule overlap. Failure Rule will take precedence in this scenario.";
  }
};

dataPointEvaluationRulesHelpers.doDataPointEvaluationRulesConflict = (rule1, rule2) => {
  if (objectHelpers.isObject(rule1) !== true || objectHelpers.isObject(rule2) !== true) {
    return false;
  }

  const rule1RangeObject = dataPointEvaluationRulesHelpers.getNumberRangeForDataPointEvaluationRule(rule1);

  if (rule1RangeObject === false) {
    return false;
  }

  const rule2RangeObject = dataPointEvaluationRulesHelpers.getNumberRangeForDataPointEvaluationRule(rule2);

  if (rule2RangeObject === false) {
    return false;
  }

  const parsedLowerBound1 = numberHelpers.parseNumber(rule1RangeObject.lowerBound);
  const parsedUpperBound1 = numberHelpers.parseNumber(rule1RangeObject.upperBound);
  const parsedLowerBound2 = numberHelpers.parseNumber(rule2RangeObject.lowerBound);
  const parsedUpperBound2 = numberHelpers.parseNumber(rule2RangeObject.upperBound);

  if (rule1RangeObject.isOverlappingFunction(parsedLowerBound2)) {
    return true;
  }

  if (rule1RangeObject.isOverlappingFunction(parsedUpperBound2)) {
    return true;
  }

  if (rule2RangeObject.isOverlappingFunction(parsedLowerBound1)) {
    return true;
  }

  if (rule2RangeObject.isOverlappingFunction(parsedUpperBound1)) {
    return true;
  }

  return false;
};

dataPointEvaluationRulesHelpers.getNumberRangeForDataPointEvaluationRule = (dataPointEvaluationRule) => {
  if (objectHelpers.isObject(dataPointEvaluationRule) !== true) {
    return false;
  }

  const triggerFilter = dataPointEvaluationRule?.trigger_filter;
  const primaryValue = numberHelpers.parseNumber(dataPointEvaluationRule?.primary_trigger_value);
  const secondaryValue = numberHelpers.parseNumber(dataPointEvaluationRule?.secondary_trigger_value);

  switch (triggerFilter) {
    case DATA_POINT_EVALUATION_TRIGGER_FILTER_TYPES.BETWEEN_INCLUSIVE:
      if (numberHelpers.hasNumberValue(primaryValue) !== true || numberHelpers.hasNumberValue(secondaryValue) !== true) {
        return false;
      }

      if (primaryValue <= secondaryValue) {
        return {
          lowerBound: primaryValue,
          upperBound: secondaryValue,
          isOverlappingFunction: (number) => {
            return numberHelpers.isNumberBetweenInclusive(primaryValue, secondaryValue, number);
          },
        };
      } else {
        return {
          lowerBound: secondaryValue,
          upperBound: primaryValue,
          isOverlappingFunction: (number) => {
            return numberHelpers.isNumberBetweenInclusive(secondaryValue, primaryValue, number);
          },
        };
      }
    case DATA_POINT_EVALUATION_TRIGGER_FILTER_TYPES.EQUAL_TO:
      if (numberHelpers.hasNumberValue(primaryValue) !== true) {
        return false;
      }

      return {
        lowerBound: primaryValue,
        upperBound: primaryValue,
        isOverlappingFunction: (number) => {
          return numberHelpers.isNumberEqual(primaryValue, number);
        },
      };
    case DATA_POINT_EVALUATION_TRIGGER_FILTER_TYPES.GREATER_THAN:
      if (numberHelpers.hasNumberValue(primaryValue) !== true) {
        return false;
      }

      return {
        lowerBound: primaryValue,
        upperBound: Infinity,
        isOverlappingFunction: (number) => {
          return numberHelpers.isNumberGreaterThan(primaryValue, number);
        },
      };
    case DATA_POINT_EVALUATION_TRIGGER_FILTER_TYPES.GREATER_THAN_OR_EQUAL_TO:
      if (numberHelpers.hasNumberValue(primaryValue) !== true) {
        return false;
      }

      return {
        lowerBound: primaryValue,
        upperBound: Infinity,
        isOverlappingFunction: (number) => {
          return numberHelpers.isNumberGreaterThanOrEqualTo(primaryValue, number);
        },
      };
    case DATA_POINT_EVALUATION_TRIGGER_FILTER_TYPES.LESS_THAN:
      if (numberHelpers.hasNumberValue(primaryValue) !== true) {
        return false;
      }

      return {
        lowerBound: -Infinity,
        upperBound: primaryValue,
        isOverlappingFunction: (number) => {
          return numberHelpers.isNumberLessThan(primaryValue, number);
        },
      };
    case DATA_POINT_EVALUATION_TRIGGER_FILTER_TYPES.LESS_THAN_OR_EQUAL_TO:
      if (numberHelpers.hasNumberValue(primaryValue) !== true) {
        return false;
      }

      return {
        lowerBound: -Infinity,
        upperBound: primaryValue,
        isOverlappingFunction: (number) => {
          return numberHelpers.isNumberLessThanOrEqualTo(primaryValue, number);
        },
      };
    default:
      return false;
  }
};

dataPointEvaluationRulesHelpers.isDataEvaluationRuleValid = (dataPointEvaluationRule) => {
  if (objectHelpers.isObject(dataPointEvaluationRule) !== true) {
    return false;
  }

  const triggerFilter = dataPointEvaluationRule?.trigger_filter;
  const hasTriggerFilter = hasStringValue(dataPointEvaluationRule?.trigger_filter);
  const hasPrimaryValue = numberHelpers.hasNumberValue(dataPointEvaluationRule?.primary_trigger_value);
  const hasSecondaryValue = numberHelpers.hasNumberValue(dataPointEvaluationRule?.secondary_trigger_value);
  const requiresSecondaryValue = triggerFilter === DATA_POINT_EVALUATION_TRIGGER_FILTER_TYPES.BETWEEN_INCLUSIVE;

  return (
    hasTriggerFilter === true && hasPrimaryValue === true && (requiresSecondaryValue === false || hasSecondaryValue === true)
  );
};

dataPointEvaluationRulesHelpers.evaluateDataPointEvaluationRule = (rule, value) => {
  if (dataPointEvaluationRulesHelpers.isDataEvaluationRuleValid(rule) !== true || numberHelpers.hasNumberValue(value) !== true || rule?.enabled === false) {
    return false;
  }

  const triggerFilter = rule?.trigger_filter;
  const primaryValue = numberHelpers.parseNumber(rule?.primary_trigger_value);
  const secondaryValue = numberHelpers.parseNumber(rule?.secondary_trigger_value);

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