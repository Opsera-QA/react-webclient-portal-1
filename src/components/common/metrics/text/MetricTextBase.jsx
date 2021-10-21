import React from "react";
import PropTypes from "prop-types";

export const METRIC_QUALITY_LEVELS = {
  SUCCESS: "success",
  WARNING: "warning",
  DANGER: "danger",
  DEFAULT: "default",
};

function MetricTextBase({ formattedText, qualityLevel }) {
  const getQualityBasedClassName = () => {
    switch (qualityLevel) {
      case METRIC_QUALITY_LEVELS.SUCCESS:
        return "metric-success-text";
      case METRIC_QUALITY_LEVELS.WARNING:
        return "metric-warning-text";
      case METRIC_QUALITY_LEVELS.DANGER:
        return "metric-danger-text";
      case METRIC_QUALITY_LEVELS.DEFAULT:
        return "metric-default-text";
    }
  };

  if (formattedText == null) {
    return null;
  }

  return <span className={getQualityBasedClassName()}>{formattedText}</span>;
}

MetricTextBase.propTypes = {
  formattedText: PropTypes.number,
  qualityLevel: PropTypes.string,
};

export default MetricTextBase;
