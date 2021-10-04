import React from "react";
import PropTypes from "prop-types";
import TwoLineDataBlockBase from "components/common/metrics/data_blocks/base/TwoLineDataBlockBase";
import MetricPercentageText from "components/common/metrics/percentage/MetricPercentageText";

function PercentageDataBlock({ percentage, subtitle, className}) {
  return (
    <TwoLineDataBlockBase
      className={className}
      title={<MetricPercentageText percentage={percentage} />}
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