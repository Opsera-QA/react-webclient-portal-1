export const dataPointEvaluationRulesHelpers = {};

dataPointEvaluationRulesHelpers.hasDataPointEvaluationRule = (dataPointEvaluationRules) => {
  return (
    typeof dataPointEvaluationRules === "object"
    &&
    (
         typeof dataPointEvaluationRules?.success_rule === "object"
      || typeof dataPointEvaluationRules?.warning_rule === "object"
      || typeof dataPointEvaluationRules?.failure_rule === "object"
    )
  );
};
