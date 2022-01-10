import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";

function DefectRemovalEfficiencyPercentageDataBlock({ score, dataPoint }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
        <TwoLineScoreDataBlock
          className="m-2"
          score={score} 
          subtitle={"Defect Removal Efficiency"}
          dataPoint={dataPoint}
        />
      
    </DataBlockBoxContainer>
  );
}
DefectRemovalEfficiencyPercentageDataBlock.propTypes = {
  score: PropTypes.string,
  dataPoint: PropTypes.object,
};

export default DefectRemovalEfficiencyPercentageDataBlock;
