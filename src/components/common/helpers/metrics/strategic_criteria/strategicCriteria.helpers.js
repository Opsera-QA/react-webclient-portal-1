import {dataPointEvaluationRulesHelpers} from "components/common/helpers/metrics/data_point/evaluation_rules/dataPointEvaluationRules.helpers";

export const strategicCriteriaHelpers = {};

strategicCriteriaHelpers.getStrategicCriteriaDataPointEvaluationRules = (strategicCriteria) => {
  if (typeof strategicCriteria !== "object" || dataPointEvaluationRulesHelpers.hasDataPointEvaluationRule(strategicCriteria?.data_point_evaluation_rules) !== true) {
    return null;
  }

  return (strategicCriteria?.data_point_evaluation_rules);
};