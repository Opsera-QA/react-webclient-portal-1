import {dataPointEvaluationRulesHelpers} from "components/common/helpers/metrics/data_point/evaluation_rules/dataPointEvaluationRules.helpers";
import {objectHelpers} from "components/common/helpers/object/object.helpers";

export const strategicCriteriaHelpers = {};

strategicCriteriaHelpers.getStrategicCriteriaDataPointEvaluationRules = (strategicCriteria) => {
  console.log("strategicCriteria?.: " + JSON.stringify(strategicCriteria));
  console.log("dataPointEvaluationRulesHelpers.hasDataPointEvaluationRule(strategicCriteria?.data_point_evaluation_rules): " + dataPointEvaluationRulesHelpers.hasDataPointEvaluationRule(strategicCriteria?.data_point_evaluation_rules));
  if (objectHelpers.isObject(strategicCriteria) !== true || dataPointEvaluationRulesHelpers.hasDataPointEvaluationRule(strategicCriteria?.data_point_evaluation_rules) !== true) {
    return null;
  }

  return (strategicCriteria?.data_point_evaluation_rules);
};