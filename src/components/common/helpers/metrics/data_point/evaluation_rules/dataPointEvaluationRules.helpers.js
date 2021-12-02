import {objectHelpers} from "components/common/helpers/object/object.helpers";

export const dataPointEvaluationRulesHelpers = {};

dataPointEvaluationRulesHelpers.hasDataPointEvaluationRule = (dataPointEvaluationRules) => {
  return (
    objectHelpers.isObject(dataPointEvaluationRules)
    &&
    (
         objectHelpers.isObject(dataPointEvaluationRules?.success_rule)  === true
      || objectHelpers.isObject(dataPointEvaluationRules?.warning_rule) === true
      || objectHelpers.isObject(dataPointEvaluationRules?.failure_rule) === true
    )
  );
};
