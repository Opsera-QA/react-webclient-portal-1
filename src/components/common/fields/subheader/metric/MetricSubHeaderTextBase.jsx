import React from "react";
import PropTypes from "prop-types";

function MetricSubHeaderTextBase({ subheaderText }) {
  return (
    <span className={"analytics-font metric-sub-header-text-spacing"}>
      {subheaderText}
    </span>
  );
}

MetricSubHeaderTextBase.propTypes = {
  subheaderText: PropTypes.string,
};

export default MetricSubHeaderTextBase;