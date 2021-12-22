import React from "react";
import PropTypes from "prop-types";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";

function CoverityIssuesOverallHighTrendDataBlock({ score, icon, className, onSelect }) {
  return (
    <DataBlockBoxContainer showBorder={true} onClickFunction={onSelect}>
      <TwoLineScoreDataBlock
        className={`${className} p-2`}
        icon={icon}
        score={score}
        subtitle={"High"}
      />
    </DataBlockBoxContainer>
  );
}

CoverityIssuesOverallHighTrendDataBlock.propTypes = {
  score: PropTypes.number,
  icon: PropTypes.object,
  className: PropTypes.string,
  onSelect: PropTypes.func,
};

export default CoverityIssuesOverallHighTrendDataBlock;
