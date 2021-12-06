import React from "react";
import PropTypes from "prop-types";

// TODO: Make Metric Filter Types

function SupportedMetricFilterInputContainer({ children, supportedFilters, filterType }) {
  if (!Array.isArray(supportedFilters) || !supportedFilters?.includes(filterType)) {
    return null;
  }

  return (
    {children}
  );
}

SupportedMetricFilterInputContainer.propTypes = {
  children: PropTypes.any,
  supportedFilters: PropTypes.array,
  filterType: PropTypes.string,
};

export default SupportedMetricFilterInputContainer;
