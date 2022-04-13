import React from "react";
import PropTypes from "prop-types";
import TwoLineDataBlockBase from "components/common/metrics/data_blocks/base/TwoLineDataBlockBase";
import MetricScoreText from "components/common/metrics/score/MetricScoreText";

function TwoLineScoreDataBlock(
  {
    score,
    subtitle,
    className,
    icon,
    iconOverlayTitle,
    iconOverlayBody,
    dataPoint,
  }) {
  return (
    <TwoLineDataBlockBase
      className={className}
      dataPoint={dataPoint}
      iconOverlayTitle={iconOverlayTitle}
      iconOverlayBody={iconOverlayBody}
      title={
        <MetricScoreText
          dataPoint={dataPoint}
          score={score}
        />
      }
      subtitle={subtitle}
      icon={icon}
    />
  );
}

TwoLineScoreDataBlock.propTypes = {
  score: PropTypes.any,
  subtitle: PropTypes.any,
  className: PropTypes.string,
  icon: PropTypes.object,
  iconOverlayTitle: PropTypes.string,
  iconOverlayBody: PropTypes.any,
  dataPoint: PropTypes.object,
};

export default TwoLineScoreDataBlock;