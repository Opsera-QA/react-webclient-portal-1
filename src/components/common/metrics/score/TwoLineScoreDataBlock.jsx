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
    dataPoint,
  }) {
  return (
    <TwoLineDataBlockBase
      className={className}
      dataPoint={dataPoint}
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
  score: PropTypes.number,
  subtitle: PropTypes.any,
  className: PropTypes.string,
  icon: PropTypes.object,
  dataPoint: PropTypes.object,
};

export default TwoLineScoreDataBlock;