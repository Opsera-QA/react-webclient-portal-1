import React from "react";
import PropTypes from "prop-types";
import DataBlockBase from "components/common/metrics/data_blocks/DataBlockBase";
import MetricScore from "components/common/metrics/score/MetricScore";

function ScoreDataBlock({ score, subtitle, className}) {
  return (
    <DataBlockBase
      className={className}
      title={<MetricScore score={score} />}
      subtitle={subtitle}
    />
  );
}

ScoreDataBlock.propTypes = {
  score: PropTypes.number,
  subtitle: PropTypes.any,
  className: PropTypes.string
};

export default ScoreDataBlock;