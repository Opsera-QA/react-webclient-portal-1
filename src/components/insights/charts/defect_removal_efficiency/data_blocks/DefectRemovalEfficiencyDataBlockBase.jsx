import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";

function DefectRemovalEfficiencyDataBlockBase({ score, subtitle, onClickFunction }) {
  return (
    <DataBlockBoxContainer showBorder={true} onClickFunction={onClickFunction}>
      <TwoLineScoreDataBlock
          className="m-3 defect-removal-efficiency"
          score={score} 
          subtitle={subtitle}
        />
    </DataBlockBoxContainer>
  );
}
DefectRemovalEfficiencyDataBlockBase.propTypes = {
  score: PropTypes.string,
  subtitle: PropTypes.string,
  onClickFunction: PropTypes.func,
};

export default DefectRemovalEfficiencyDataBlockBase;
