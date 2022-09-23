import React from "react";
import PropTypes from "prop-types";
import TwoLineDataBlockBase from "components/common/metrics/data_blocks/base/TwoLineDataBlockBase";
import MetricPercentageText from "components/common/metrics/percentage/MetricPercentageText";

function TwoLinePercentageDataBlock(
  {
    percentage,
    dataPoint,
    subtitle,
    className,
    icon,
    iconOverlayTitle,
    iconOverlayBody
  }) {
  return (
    <TwoLineDataBlockBase
      className={className}
      dataPoint={dataPoint}
      title={
        <MetricPercentageText
          dataPoint={dataPoint}
          percentage={percentage}
        />
      }
      subtitle={subtitle}
      iconOverlayTitle={iconOverlayTitle}
      iconOverlayBody={iconOverlayBody}
      icon={icon}
    />
  );
}

TwoLinePercentageDataBlock.propTypes = {
  percentage: PropTypes.number,
  dataPoint: PropTypes.object,
  subtitle: PropTypes.any,
  className: PropTypes.string,
  icon: PropTypes.object,
  iconOverlayTitle: PropTypes.string,
  iconOverlayBody: PropTypes.any,
};

export default TwoLinePercentageDataBlock;