import React from "react";
import PropTypes from "prop-types";
import MetricSubHeaderTextBase from "components/common/fields/subheader/metric/MetricSubHeaderTextBase";

function H5MetricSubHeader({ subheaderText, className }) {
  return (
    <div className={className}>
      <h5>
        <MetricSubHeaderTextBase subheaderText={subheaderText} />
      </h5>
    </div>
  );
}

H5MetricSubHeader.propTypes = {
  subheaderText: PropTypes.string,
  className: PropTypes.string,
};

export default H5MetricSubHeader;