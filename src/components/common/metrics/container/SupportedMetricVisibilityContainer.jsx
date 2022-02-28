import React from "react";
import PropTypes from "prop-types";

function SupportedMetricVisibilityContainer({ children, dataPoint }) {
  if (children == null || dataPoint?.visibility?.isVisible === false) {
    return <></>;
  }

  return (children);
}

SupportedMetricVisibilityContainer.propTypes = {
  children: PropTypes.any,
  dataPoint: PropTypes.object,
};

export default SupportedMetricVisibilityContainer;
