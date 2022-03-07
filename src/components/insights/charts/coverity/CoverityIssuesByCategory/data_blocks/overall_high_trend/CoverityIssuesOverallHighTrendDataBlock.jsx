import React from "react";
import PropTypes from "prop-types";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import ThreeLineScoreDataBlock from "../../../../../../common/metrics/score/ThreeLineScoreDataBlock";

function CoverityIssuesOverallHighTrendDataBlock({ score, icon, className, onSelect, lastScore }) {
  return (
    <DataBlockBoxContainer showBorder={true} onClickFunction={onSelect}>
      {/*<TwoLineScoreDataBlock*/}
      {/*  className={`${className} p-2`}*/}
      {/*  icon={icon}*/}
      {/*  score={score}*/}
      {/*  subtitle={"High"}*/}
      {/*/>*/}
      <ThreeLineScoreDataBlock
        className={`${className} p-2`}
        score={score}
        topText={"High"}
        bottomText={"Last Scan :" + lastScore}
        icon={icon}
      />
    </DataBlockBoxContainer>
  );
}

CoverityIssuesOverallHighTrendDataBlock.propTypes = {
  score: PropTypes.number,
  icon: PropTypes.object,
  className: PropTypes.string,
  onSelect: PropTypes.func,
  lastScore: PropTypes.number
};

export default CoverityIssuesOverallHighTrendDataBlock;
