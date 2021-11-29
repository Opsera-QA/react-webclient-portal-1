import {hasStringValue} from "components/common/helpers/string-helpers";
import {DATA_POINT_EVALUATION_TRIGGER_FILTER_TYPES} from "components/common/inputs/metric/strategic_criteria/data_point_evaluation/row/dataPointEvaluationTrigger.types";
import {METRIC_QUALITY_LEVELS} from "components/common/metrics/text/MetricTextBase";

export const strategicCriteriaHelpers = {};

strategicCriteriaHelpers.evaluateDataPointQualityLevel = (dataPoint, value) => {
  if (typeof dataPoint !== "object" || typeof dataPoint?.data_point_evaluation_rules !== "object" || typeof value !== "number"){
    return null;
  }

  const dataPointEvaluationRules = dataPoint?.data_point_evaluation_rules;
  const successRule = dataPointEvaluationRules.success_rule;
  const warningRule = dataPointEvaluationRules.warning_rule;
  const failureRule = dataPointEvaluationRules.failure_rule;

  if (typeof failureRule === "object") {
    const isFailure = evaluateDataPointEvaluationRule(failureRule, value);

    if (isFailure === true) {
      return METRIC_QUALITY_LEVELS.DANGER;
    }
  }

  if (typeof warningRule === "object") {
    const isWarning = evaluateDataPointEvaluationRule(warningRule, value);

    if (isWarning === true) {
      return METRIC_QUALITY_LEVELS.WARNING;
    }
  }

  if (typeof successRule === "object") {
    const isSuccess = evaluateDataPointEvaluationRule(successRule, value);

    if (isSuccess === true) {
      return METRIC_QUALITY_LEVELS.SUCCESS;
    }
  }

  return null;
};

strategicCriteriaHelpers.getDataPoint = (dataPoints, dataPointIdentifier) => {
  if (!Array.isArray(dataPoints) || dataPoints.length === 0) {
    return null;
  }

  return (
    dataPoints.find((dataPoint) => dataPoint.identifier === dataPointIdentifier)
  );
};

// The data checks are redundant but in case of reuse leaving them in here for now.
const evaluateDataPointEvaluationRule = (rule, value) => {
  if (typeof rule !== "object" || typeof value !== "number") {
    return false;
  }

  const triggerFilter = rule?.trigger_filter;

  if (!hasStringValue(triggerFilter)) {
    return false;
  }

  switch (triggerFilter) {
    case DATA_POINT_EVALUATION_TRIGGER_FILTER_TYPES.BETWEEN_INCLUSIVE:
      return isNumberBetweenInclusive(rule?.primary_trigger_value, rule?.secondary_trigger_value, value);
    case DATA_POINT_EVALUATION_TRIGGER_FILTER_TYPES.EQUAL_TO:
      return isNumberEqual(rule?.primary_trigger_value, value);
    case DATA_POINT_EVALUATION_TRIGGER_FILTER_TYPES.GREATER_THAN:
      return isNumberGreaterThan(rule?.primary_trigger_value, value);
    case DATA_POINT_EVALUATION_TRIGGER_FILTER_TYPES.GREATER_THAN_OR_EQUAL_TO:
      return isNumberGreaterThanOrEqualTo(rule?.primary_trigger_value, value);
    case DATA_POINT_EVALUATION_TRIGGER_FILTER_TYPES.LESS_THAN:
      return isNumberLessThan(rule?.primary_trigger_value, value);
    case DATA_POINT_EVALUATION_TRIGGER_FILTER_TYPES.LESS_THAN_OR_EQUAL_TO:
      return isNumberLessThanOrEqualTo(rule?.primary_trigger_value, value);
    default:
      return false;
  }
};

// TODO: Move these to a general helper if reuse makes sense. Leaving here for now.
const isNumberBetweenInclusive = (lowerEnd, upperEnd, number) => {
  if (typeof lowerEnd !== "number" || typeof upperEnd !== "number" || typeof number !== "number") {
    return false;
  }

  return (lowerEnd <= number && upperEnd >= number);
};

const isNumberEqual = (comparisonValue, number) => {
  if (typeof comparisonValue !== "number" || typeof number !== "number") {
    return false;
  }

  return (comparisonValue === number);
};

const isNumberGreaterThan = (comparisonValue, number) => {
  if (typeof comparisonValue !== "number" || typeof number !== "number") {
    return false;
  }

  return (number > comparisonValue);
};

const isNumberGreaterThanOrEqualTo = (comparisonValue, number) => {
  if (typeof comparisonValue !== "number" || typeof number !== "number") {
    return false;
  }

  return (number >= comparisonValue);
};

const isNumberLessThan = (comparisonValue, number) => {
  if (typeof comparisonValue !== "number" || typeof number !== "number") {
    return false;
  }

  return (number < comparisonValue);
};

const isNumberLessThanOrEqualTo = (comparisonValue, number) => {
  if (typeof comparisonValue !== "number" || typeof number !== "number") {
    return false;
  }

  return (number <= comparisonValue);
};