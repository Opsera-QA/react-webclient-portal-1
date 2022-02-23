import React from "react";
import PropTypes from "prop-types";
import {faExclamationTriangle} from "@fortawesome/pro-light-svg-icons";
import MetricDataPointEvaluationRuleInputBase
  from "components/common/inputs/metric/strategic_criteria/data_point_evaluation/row/MetricDataPointEvaluationRuleInputBase";

function MetricDataPointEvaluationWarningRuleInputBase(
  {
    dataPointEvaluationRules,
    updateRuleFunction,
  }) {
  return (
    <MetricDataPointEvaluationRuleInputBase
      ruleData={dataPointEvaluationRules?.warning_rule}
      fieldName={"warning_rule"}
      updateRuleFunction={updateRuleFunction}
      title={"Warning Criteria"}
      icon={faExclamationTriangle}
    />
  );
}

MetricDataPointEvaluationWarningRuleInputBase.propTypes = {
  dataPointEvaluationRules: PropTypes.object,
  updateRuleFunction: PropTypes.func,
};

export default MetricDataPointEvaluationWarningRuleInputBase;