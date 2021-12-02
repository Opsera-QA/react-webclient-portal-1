import React from "react";
import PropTypes from "prop-types";
import {
  faCheckCircle,
  faExclamationCircle,
  faExclamationTriangle
} from "@fortawesome/pro-light-svg-icons";
import {DATA_POINT_EVALUATION_RULE_TYPES} from "components/common/inputs/metric/strategic_criteria/data_point_evaluation/dataPointEvaluationRule.types";
import IconBase from "components/common/icons/IconBase";

function DataPointEvaluationRuleInfoPanel({ dataPointEvaluationRule, dataPointEvaluationRuleType }) {
  const getIcon = () => {
    switch (dataPointEvaluationRuleType) {
      case DATA_POINT_EVALUATION_RULE_TYPES.SUCCESS:
        return faCheckCircle;
      case DATA_POINT_EVALUATION_RULE_TYPES.WARNING:
        return faExclamationTriangle;
      case DATA_POINT_EVALUATION_RULE_TYPES.FAILURE:
        return faExclamationCircle;
    }
  };

  const getBody = () => {
    if (typeof dataPointEvaluationRule !== "object") {
      return `There is no ${dataPointEvaluationRuleType} rule assigned to this data point.`;
    }

    // TODO: Add incomplete message. type rule is not complete so it will not take effect
    // if (typeof dataPointEvaluationRule !== "object") {
    //   return `There is no ${dataPointEvaluationRuleType} rule assigned to this data point.`;
    // }

    return "insert rule formatted text here";
  };

  return (
    <div className={"d-flex my-2"}>
      <IconBase className={"mr-2"} icon={getIcon()} />
      {getBody()}
    </div>
  );
}

DataPointEvaluationRuleInfoPanel.propTypes = {
  dataPointEvaluationRule: PropTypes.object,
  dataPointEvaluationRuleType: PropTypes.string,
};

export default DataPointEvaluationRuleInfoPanel;