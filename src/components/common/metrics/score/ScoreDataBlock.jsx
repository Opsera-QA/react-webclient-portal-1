import React from "react";
import PropTypes from "prop-types";
import DataBlockBase from "components/common/metrics/data_blocks/DataBlockBase";
import MetricScore from "components/common/metrics/score/MetricScore";

function ScoreDataBlock({ score, subtitle, tooltipText, className}) {
  return (
    <DataBlockBase
      className={className}
      title={<MetricScore score={score} />}
      subtitle={subtitle}
      tooltipText={tooltipText}
    />
  );
}

ScoreDataBlock.propTypes = {
  score: PropTypes.number,
  subtitle: PropTypes.any,
  tooltipText: PropTypes.string,
  clickAction: PropTypes.func,
  className: PropTypes.string
};

export default ScoreDataBlock;