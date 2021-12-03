import React from "react";
import PropTypes from "prop-types";
import {
  getDataPointEvaluationRuleTypeIcon,
  getDataPointEvaluationRuleTypeLabel
} from "components/common/inputs/metric/strategic_criteria/data_point_evaluation/dataPointEvaluationRule.types";
import IconBase from "components/common/icons/IconBase";
import {objectHelpers} from "components/common/helpers/object/object.helpers";
import {dataPointEvaluationRulesHelpers} from "components/common/helpers/metrics/data_point/evaluation_rules/dataPointEvaluationRules.helpers";

function DataPointEvaluationRuleInfoPanel({ dataPointEvaluationRule, dataPointEvaluationRuleType }) {
  const getBody = () => {
    if (objectHelpers.isObject(dataPointEvaluationRule) !== true) {
      return `There is no ${getDataPointEvaluationRuleTypeLabel(dataPointEvaluationRuleType)} rule assigned to this data point.`;
    }

    if (dataPointEvaluationRulesHelpers.isDataEvaluationRuleComplete(dataPointEvaluationRule) !== true) {
      return `The ${getDataPointEvaluationRuleTypeLabel(dataPointEvaluationRuleType)} rule assigned to this data point is incomplete and will not take effect.`;
    }

    return "insert rule formatted text here";
  };

  return (
    <div className={"d-flex my-2"}>
      <IconBase className={"mr-2"} icon={getDataPointEvaluationRuleTypeIcon(dataPointEvaluationRuleType)} />
      {getBody()}
    </div>
  );
}

DataPointEvaluationRuleInfoPanel.propTypes = {
  dataPointEvaluationRule: PropTypes.object,
  dataPointEvaluationRuleType: PropTypes.string,
};

export default DataPointEvaluationRuleInfoPanel;