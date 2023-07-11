import React from "react";
import PropTypes from "prop-types";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import MetricDataPointEvaluationRuleInputBase
from "components/common/inputs/metric/data_points/strategic_criteria/data_point_evaluation/row/MetricDataPointEvaluationRuleInputBase";
import {dataPointEvaluationRulesHelpers} from "components/common/helpers/metrics/data_point/evaluation_rules/dataPointEvaluationRules.helpers";

function MetricDataPointEvaluationFailureRuleInput(
  {
    dataPointEvaluationRules,
    updateRuleFunction,
    dataPointType
  }) {
  return (
    <MetricDataPointEvaluationRuleInputBase
      ruleData={dataPointEvaluationRules?.failure_rule}
      fieldName={"failure_rule"}
      updateRuleFunction={updateRuleFunction}
      title={"Failure Criteria"}
      icon={faExclamationCircle}
      headerClassName={"danger-red-header"}
      errorMessage={dataPointEvaluationRulesHelpers.getConflictingRuleError(dataPointEvaluationRules)}
      dataPointType={dataPointType}
    />
  );
}

MetricDataPointEvaluationFailureRuleInput.propTypes = {
  dataPointEvaluationRules: PropTypes.object,
  updateRuleFunction: PropTypes.func,
  dataPointType: PropTypes.string,
};

export default MetricDataPointEvaluationFailureRuleInput;