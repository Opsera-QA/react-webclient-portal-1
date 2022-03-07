import React from "react";
import PropTypes from "prop-types";

function MetricSubHeaderTextBase({ subheaderText }) {
  return (
    <span className={"font-inter-light-400 metric-block-header-text"}>
      {subheaderText}
    </span>
  );
}

MetricSubHeaderTextBase.propTypes = {
  subheaderText: PropTypes.string,
};

export default MetricSubHeaderTextBase;