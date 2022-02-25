import React from "react";
import PropTypes from "prop-types";

export const METRIC_QUALITY_LEVELS = {
  SUCCESS: "success",
  WARNING: "warning",
  DANGER: "danger",
  DEFAULT: "default",
};

function MetricTextBase({ formattedText, qualityLevel, className }) {
  const getQualityBasedClassName = () => {
    switch (qualityLevel) {
      case METRIC_QUALITY_LEVELS.SUCCESS:
        return "green";
      case METRIC_QUALITY_LEVELS.WARNING:
        return "yellow";
      case METRIC_QUALITY_LEVELS.DANGER:
        return "danger-red";
    }
  };

  return <span className={`${getQualityBasedClassName()} ${className}`}>{formattedText}</span>;
}

MetricTextBase.propTypes = {
  formattedText: PropTypes.string,
  qualityLevel: PropTypes.string,
  className: PropTypes.string,
};

MetricTextBase.defaultProps = {
  formattedText: "N/A",
};

export default MetricTextBase;
