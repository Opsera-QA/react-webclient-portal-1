import React from "react";
import PropTypes from "prop-types";
import {faCheckCircle} from "@fortawesome/pro-light-svg-icons";
import MetricDataPointEvaluationRuleInputBase
  from "components/common/inputs/metric/data_points/strategic_criteria/data_point_evaluation/row/MetricDataPointEvaluationRuleInputBase";
import {dataPointEvaluationRulesHelpers} from "components/common/helpers/metrics/data_point/evaluation_rules/dataPointEvaluationRules.helpers";

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
      headerClassName={"green-header"}
      errorMessage={dataPointEvaluationRulesHelpers.getConflictingRuleError(dataPointEvaluationRules)}
    />
  );
}

MetricDataPointEvaluationSuccessRuleInput.propTypes = {
  dataPointEvaluationRules: PropTypes.object,
  updateRuleFunction: PropTypes.func,
};

export default MetricDataPointEvaluationSuccessRuleInput;