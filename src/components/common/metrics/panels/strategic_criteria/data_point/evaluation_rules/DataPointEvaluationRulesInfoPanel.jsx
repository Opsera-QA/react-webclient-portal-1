import React from "react";
import PropTypes from "prop-types";
import {
  faCheckCircle,
  faExclamationCircle,
  faExclamationTriangle
} from "@fortawesome/pro-light-svg-icons";

function DataPointEvaluationRulesInfoPanel({ dataPointEvaluationRules }) {
  if (typeof dataPointEvaluationRule !== "object") {
    return null;
  }

  return (
    <div className={"d-flex my-2"}>
      <div className={"mr-2"}>
        {getIcon()}
      </div>
    </div>
  );
}

DataPointEvaluationRulesInfoPanel.propTypes = {
  dataPointEvaluationRules: PropTypes.object,
};

export default DataPointEvaluationRulesInfoPanel;