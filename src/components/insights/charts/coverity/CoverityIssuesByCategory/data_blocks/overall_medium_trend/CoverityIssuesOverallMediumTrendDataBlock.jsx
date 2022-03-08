import React from "react";
import PropTypes from "prop-types";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import ThreeLineScoreDataBlock from "../../../../../../common/metrics/score/ThreeLineScoreDataBlock";

function CoverityIssuesOverallMediumTrendDataBlock({ score, icon, className, onSelect, lastScore }) {
  return (
    <DataBlockBoxContainer showBorder={true} onClickFunction={onSelect}>
      {/*<TwoLineScoreDataBlock*/}
      {/*  className={`${className} p-2`}*/}
      {/*  icon={icon}*/}
      {/*  score={score}*/}
      {/*  subtitle={"Medium"}*/}
      {/*/>*/}
      <ThreeLineScoreDataBlock
        className={`${className} p-2`}
        score={score}
        topText={"Medium"}
        bottomText={"Last Scan: " + lastScore}
        icon={icon}
      />
    </DataBlockBoxContainer>
  );
}

CoverityIssuesOverallMediumTrendDataBlock.propTypes = {
  score: PropTypes.number,
  icon: PropTypes.object,
  className: PropTypes.string,
  onSelect: PropTypes.func,
  lastScore: PropTypes.number
};

export default CoverityIssuesOverallMediumTrendDataBlock;
