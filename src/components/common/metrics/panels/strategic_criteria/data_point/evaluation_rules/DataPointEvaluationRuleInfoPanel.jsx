import React from "react";
import PropTypes from "prop-types";
import {
  getDataPointEvaluationRuleTypeIcon,
  getFormattedDataPointEvaluationText
} from "components/common/inputs/metric/data_points/strategic_criteria/data_point_evaluation/dataPointEvaluationRule.types";
import IconBase from "components/common/icons/IconBase";

function DataPointEvaluationRuleInfoPanel({ dataPointEvaluationRule, dataPointEvaluationRuleType }) {
  return (
    <div className={"d-flex my-2"}>
      <IconBase className={"mr-2"} icon={getDataPointEvaluationRuleTypeIcon(dataPointEvaluationRuleType)} />
      {getFormattedDataPointEvaluationText(dataPointEvaluationRule, dataPointEvaluationRuleType)}
    </div>
  );
}

DataPointEvaluationRuleInfoPanel.propTypes = {
  dataPointEvaluationRule: PropTypes.object,
  dataPointEvaluationRuleType: PropTypes.string,
};

export default DataPointEvaluationRuleInfoPanel;