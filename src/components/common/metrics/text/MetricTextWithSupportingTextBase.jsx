import React from "react";
import PropTypes from "prop-types";

export const METRIC_QUALITY_LEVELS = {
  SUCCESS: "success",
  WARNING: "warning",
  DANGER: "danger",
};

function MetricTextWithSupportingTextBase({ formattedText, supportingText, qualityLevel }) {

  const getQualityBasedClassName = () => {
    switch (qualityLevel) {
      case METRIC_QUALITY_LEVELS.SUCCESS:
        return "metric-success-text";
      case METRIC_QUALITY_LEVELS.WARNING:
        return "metric-warning-text";
      case METRIC_QUALITY_LEVELS.DANGER:
        return "metric-danger-text";
    }
  };

  if (formattedText == null) {
    return null;
  }

  return (
    <span className={getQualityBasedClassName()}>
      {formattedText}<span className="supporting-text">{supportingText}</span>
    </span>
  );
}

MetricTextWithSupportingTextBase.propTypes = {
  formattedText: PropTypes.number,
  supportingText: PropTypes.string,
  qualityLevel: PropTypes.string,
};

export default MetricTextWithSupportingTextBase;