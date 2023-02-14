import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import ThreeLineScoreDataBlock from "components/common/metrics/score/ThreeLineScoreDataBlock";

function AquasecIssuesOverallTrendDataBlock({ score, severity, icon, className, onSelect, lastScore, iconOverlayBody }) {
  return (
    <DataBlockBoxContainer showBorder={true} onClickFunction={onSelect}>
      <ThreeLineScoreDataBlock
        className={`${className} p-2`}
        score={score}
        topText={severity}
        bottomText={"Last Scan: " + lastScore}
        icon={icon}
        iconOverlayBody={iconOverlayBody}
      />
    </DataBlockBoxContainer>
  );
}

AquasecIssuesOverallTrendDataBlock.propTypes = {
  score: PropTypes.number,
  severity: PropTypes.string,
  icon: PropTypes.object,
  className: PropTypes.string,
  onSelect: PropTypes.func,
  lastScore: PropTypes.number,
  iconOverlayBody: PropTypes.any,
};

export default AquasecIssuesOverallTrendDataBlock;
