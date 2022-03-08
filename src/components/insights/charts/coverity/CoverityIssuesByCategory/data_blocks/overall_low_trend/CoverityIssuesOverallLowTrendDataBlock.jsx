import React from "react";
import PropTypes from "prop-types";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLineDataBlockBase from "../../../../../../common/metrics/data_blocks/base/TwoLineDataBlockBase";
import MetricScoreText from "../../../../../../common/metrics/score/MetricScoreText";
import ThreeLineDataBlockBase from "../../../../../../common/metrics/data_blocks/base/ThreeLineDataBlockBase";
import ThreeLineScoreDataBlock from "../../../../../../common/metrics/score/ThreeLineScoreDataBlock";

function CoverityIssuesOverallLowTrendDataBlock({ score, icon, className, onSelect, lastScore }) {
  return (
    <DataBlockBoxContainer showBorder={true} onClickFunction={onSelect}>
      {/*<TwoLineScoreDataBlock*/}
      {/*  className={`${className} p-2`}*/}
      {/*  icon={icon}*/}
      {/*  score={score}*/}
      {/*  subtitle={"Low" + lastScore}*/}
      {/*/>*/}
      <ThreeLineScoreDataBlock
        className={`${className} p-2`}
        score={score}
        topText={"Low"}
        bottomText={"Last Scan: " + lastScore}
        icon={icon}
      />
    </DataBlockBoxContainer>
  );
}

CoverityIssuesOverallLowTrendDataBlock.propTypes = {
  score: PropTypes.number,
  icon: PropTypes.object,
  className: PropTypes.string,
  onSelect: PropTypes.func,
  lastScore: PropTypes.number
};

export default CoverityIssuesOverallLowTrendDataBlock;
