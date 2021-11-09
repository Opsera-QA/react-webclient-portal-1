import React from "react";
import PropTypes from "prop-types";
import TwoLineDataBlockBase from "components/common/metrics/data_blocks/base/TwoLineDataBlockBase";
import MetricScoreText from "components/common/metrics/score/MetricScoreText";

function TwoLineScoreDataBlock({ score, subtitle, className, icon, }) {
  return (
    <TwoLineDataBlockBase
      className={className}
      title={<MetricScoreText score={score} />}
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
};

export default TwoLineScoreDataBlock;