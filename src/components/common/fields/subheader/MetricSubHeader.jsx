import React from "react";
import PropTypes from "prop-types";

function MetricSubHeader({ subheaderText, className }) {
  return (
    <div className={className}>
      <h5 className={"font-inter-light-400 metric-block-header-text"}>
        {subheaderText}
      </h5>
    </div>
  );
}

MetricSubHeader.propTypes = {
  subheaderText: PropTypes.string,
  className: PropTypes.string,
};

export default MetricSubHeader;