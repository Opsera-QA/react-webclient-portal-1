import React from "react";
import PropTypes from "prop-types";

export const METRIC_QUALITY_LEVELS = {
  SUCCESS: "success",
  WARNING: "warning",
  DANGER: "danger",
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
    }
  };

  return (
    <span className={getQualityBasedClassName()}>
      {formattedText}
    </span>
  );
}

MetricTextBase.propTypes = {
  formattedText: PropTypes.string,
  qualityLevel: PropTypes.string,
};

MetricTextBase.defaultProps = {
  formattedText: "N/A",
};

export default MetricTextBase;