import React from "react";
import PropTypes from "prop-types";
import MetricSubHeaderTextBase from "components/common/fields/subheader/metric/MetricSubHeaderTextBase";

function H4MetricSubHeader({ subheaderText, className }) {
  return (
    <div className={className}>
      <h4>
        <MetricSubHeaderTextBase subheaderText={subheaderText} />
      </h4>
    </div>
  );
}

H4MetricSubHeader.propTypes = {
  subheaderText: PropTypes.string,
  className: PropTypes.string,
};

export default H4MetricSubHeader;