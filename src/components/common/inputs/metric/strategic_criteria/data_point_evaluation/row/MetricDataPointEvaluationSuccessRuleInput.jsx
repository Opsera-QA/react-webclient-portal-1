import React from "react";
import PropTypes from "prop-types";
import {faCheckCircle} from "@fortawesome/pro-light-svg-icons";
import MetricDataPointEvaluationRuleInputBase
  from "components/common/inputs/metric/strategic_criteria/data_point_evaluation/row/MetricDataPointEvaluationRuleInputBase";

function MetricDataPointEvaluationSuccessRuleInput(
  {
    dataPointEvaluationRules,
    updateRuleFunction,
  }) {
  return (
    <MetricDataPointEvaluationRuleInputBase
      ruleData={dataPointEvaluationRules?.success_rule}
      fieldName={"success_rule"}
      updateRuleFunction={updateRuleFunction}
      title={"Success Criteria"}
      icon={faCheckCircle}
    />
  );
}

MetricDataPointEvaluationSuccessRuleInput.propTypes = {
  dataPointEvaluationRules: PropTypes.object,
  updateRuleFunction: PropTypes.func,
};

export default MetricDataPointEvaluationSuccessRuleInput;