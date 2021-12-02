import React from "react";
import PropTypes from "prop-types";
import {
  faCheckCircle,
  faExclamationCircle,
  faExclamationTriangle
} from "@fortawesome/pro-light-svg-icons";

function DataPointEvaluationRuleInfoPanel({ dataPointEvaluationRule }) {
  // TODO: Should this be in a types file?
  const getIcon = () => {
    switch (dataPointEvaluationRule) {
      case "success":
        return faCheckCircle;
      case "warning":
        return faExclamationTriangle;
      case "failure":
        return faExclamationCircle;
    }
  };

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

DataPointEvaluationRuleInfoPanel.propTypes = {
  dataPointEvaluationRule: PropTypes.object,
};

export default DataPointEvaluationRuleInfoPanel;