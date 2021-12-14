import {METRIC_QUALITY_LEVELS} from "components/common/metrics/text/MetricTextBase";
import {numberHelpers} from "components/common/helpers/number/number.helpers";
import {
  DATA_POINT_EVALUATION_RULE_TYPES,
  SUPPORTED_DATA_POINT_EVALUATION_RULE_TYPES
} from "components/common/inputs/metric/strategic_criteria/data_point_evaluation/dataPointEvaluationRule.types";
import {dataPointEvaluationRulesHelpers} from "components/common/helpers/metrics/data_point/evaluation_rules/dataPointEvaluationRules.helpers";
import {objectHelpers} from "components/common/helpers/object/object.helpers";

export const dataPointHelpers = {};

dataPointHelpers.evaluateDataPointQualityLevel = (dataPoint, value) => {
  if (dataPointHelpers.hasDataPointEvaluationRules(dataPoint) !== true || numberHelpers.hasNumberValue(value) !== true){
    return null;
  }

  const dataPointEvaluationRules = dataPoint?.strategic_criteria?.data_point_evaluation_rules;
  const successRule = dataPointEvaluationRules.success_rule;
  const warningRule = dataPointEvaluationRules.warning_rule;
  const failureRule = dataPointEvaluationRules.failure_rule;

  if (objectHelpers.isObject(failureRule) === true) {
    const isFailure = dataPointEvaluationRulesHelpers.evaluateDataPointEvaluationRule(failureRule, value);

    if (isFailure === true) {
      return METRIC_QUALITY_LEVELS.DANGER;
    }
  }

  if (objectHelpers.isObject(warningRule) === true) {
    const isWarning = dataPointEvaluationRulesHelpers.evaluateDataPointEvaluationRule(warningRule, value);

    if (isWarning === true) {
      return METRIC_QUALITY_LEVELS.WARNING;
    }
  }

  if (objectHelpers.isObject(successRule) === true) {
    const isSuccess = dataPointEvaluationRulesHelpers.evaluateDataPointEvaluationRule(successRule, value);

    if (isSuccess === true) {
      return METRIC_QUALITY_LEVELS.SUCCESS;
    }
  }

  return null;
};

dataPointHelpers.getDataPointStrategicCriteria = (dataPoint) => {
  if (dataPointHelpers.hasStrategicCriteria(dataPoint) !== true) {
    return null;
  }

  return (dataPoint?.strategic_criteria);
};

dataPointHelpers.hasStrategicCriteria = (dataPoint) => {
  return (
       objectHelpers.isObject(dataPoint) === true
    && objectHelpers.isObject(dataPoint?.strategic_criteria) === true
    && Object.keys(dataPoint?.strategic_criteria).length > 0
  );
};

dataPointHelpers.hasDataPointEvaluationRules = (dataPoint) => {
  if (dataPointHelpers.hasStrategicCriteria(dataPoint) !== true) {
    return false;
  }

  const dataPointEvaluationRules = dataPoint?.strategic_criteria?.data_point_evaluation_rules;
  return dataPointEvaluationRulesHelpers.hasDataPointEvaluationRule(dataPointEvaluationRules);
};

dataPointHelpers.getStrategicCriteriaDataPointEvaluationRule = (dataPointRuleType, dataPoint) => {
  if (SUPPORTED_DATA_POINT_EVALUATION_RULE_TYPES.includes(dataPointRuleType) !== true || dataPointHelpers.hasDataPointEvaluationRules(dataPoint) !== true) {
    return null;
  }

  const dataPointEvaluationRules = dataPoint?.strategic_criteria?.data_point_evaluation_rules;

  switch (dataPointRuleType) {
    case DATA_POINT_EVALUATION_RULE_TYPES.SUCCESS:
      return dataPointEvaluationRules?.success_rule;
    case DATA_POINT_EVALUATION_RULE_TYPES.WARNING:
      return dataPointEvaluationRules?.warning_rule;
    case DATA_POINT_EVALUATION_RULE_TYPES.FAILURE:
      return dataPointEvaluationRules?.failure_rule;
  }

  return null;
};

dataPointHelpers.getDataPoint = (dataPoints, dataPointIdentifier) => {
  if (!Array.isArray(dataPoints) || dataPoints.length === 0) {
    return null;
  }

  return (
    dataPoints.find((dataPoint) => dataPoint.identifier === dataPointIdentifier)
  );
};