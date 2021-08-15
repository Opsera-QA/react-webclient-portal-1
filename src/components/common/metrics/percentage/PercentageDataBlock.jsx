import React from "react";
import PropTypes from "prop-types";
import DataBlockBase from "components/common/metrics/data_blocks/DataBlockBase";
import MetricPercentage from "components/common/metrics/percentage/MetricPercentage";

function PercentageDataBlock({ percentage, subtitle, className}) {
  return (
    <DataBlockBase
      className={className}
      title={<MetricPercentage percentage={percentage} />}
      subtitle={subtitle}
    />
  );
}

PercentageDataBlock.propTypes = {
  percentage: PropTypes.number,
  subtitle: PropTypes.any,
  className: PropTypes.string
};

export default PercentageDataBlock;