import React from "react";
import PropTypes from "prop-types";
import TwoLineDataBlockBase from "components/common/metrics/data_blocks/base/TwoLineDataBlockBase";
import MetricPercentageText from "components/common/metrics/percentage/MetricPercentageText";

// TODO: Rename to TwoLinePercentageDataBlock
function PercentageDataBlock(
  {
    percentage,
    dataPoint,
    subtitle,
    className,
    dataBlockInfoPanel,
  }) {
  return (
    <TwoLineDataBlockBase
      className={className}
      title={
        <MetricPercentageText
          dataPoint={dataPoint}
          percentage={percentage}
        />
      }
      subtitle={subtitle}
      infoOverlayPanel={dataBlockInfoPanel}
    />
  );
}

PercentageDataBlock.propTypes = {
  percentage: PropTypes.number,
  dataPoint: PropTypes.object,
  subtitle: PropTypes.any,
  className: PropTypes.string,
  dataBlockInfoPanel: PropTypes.any,
};

export default PercentageDataBlock;