import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import ThreeLineScoreDataBlock from "components/common/metrics/score/ThreeLineScoreDataBlock";
import { getReverseTrend, getReverseTrendIcon, getTrendDescription } from "../charts-helpers";

function AquasecIssuesOverallTrendDataBlock({ score, severity, onSelect, lastScore }) {
  const displayScore = score || 0;
  const color = getReverseTrend(score, lastScore);
  const icon = getReverseTrendIcon(color);
  const description = getTrendDescription(color);
  
  return (
    <DataBlockBoxContainer showBorder={true} onClickFunction={() => onSelect(severity)}>
      <ThreeLineScoreDataBlock
        className={`${color} p-2`}
        score={displayScore}
        topText={severity}
        bottomText={`Last Scan: ${lastScore}`}
        icon={icon}
        iconOverlayBody={description}
      />
    </DataBlockBoxContainer>
  );
}

AquasecIssuesOverallTrendDataBlock.propTypes = {
  score: PropTypes.number,
  severity: PropTypes.string,
  trend: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  lastScore: PropTypes.number,
};

export default AquasecIssuesOverallTrendDataBlock;
