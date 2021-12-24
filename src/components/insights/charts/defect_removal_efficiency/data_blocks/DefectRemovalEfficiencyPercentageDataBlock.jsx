import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLinePercentageDataBlock from "components/common/metrics/percentage/TwoLinePercentageDataBlock";

function DefectRemovalEfficiencyPercentageDataBlock({ score, dataPoint }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
      <div className={"p-2"} style={{minHeight: '100px'}}>
        <TwoLinePercentageDataBlock dataPoint={dataPoint} percentage={score} subtitle={"Defect Removal Efficiency"} />
      </div>
    </DataBlockBoxContainer>
  );
}
DefectRemovalEfficiencyPercentageDataBlock.propTypes = {
  score: PropTypes.string,
  dataPoint: PropTypes.object,
};

export default DefectRemovalEfficiencyPercentageDataBlock;
