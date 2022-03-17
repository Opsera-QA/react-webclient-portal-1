import React from "react";
import PropTypes from "prop-types";
import MetricSubHeaderTextBase from "components/common/fields/subheader/metric/MetricSubHeaderTextBase";

function H3MetricSubHeader({ subheaderText, className }) {
  return (
    <div className={className}>
      <h3>
       <MetricSubHeaderTextBase subheaderText={subheaderText} />
      </h3>
    </div>
  );
}

H3MetricSubHeader.propTypes = {
  subheaderText: PropTypes.string,
  className: PropTypes.string,
};

export default H3MetricSubHeader;