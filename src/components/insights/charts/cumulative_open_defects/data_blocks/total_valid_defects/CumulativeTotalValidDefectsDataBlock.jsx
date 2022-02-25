import React from "react";
import PropTypes from "prop-types";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";

function CumulativeTotalValidDefectsDataBlock({ defects }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
      <TwoLineScoreDataBlock
          className="m-3"
          score={defects} 
          subtitle={"Total Valid Defects Closed"}
      />
    </DataBlockBoxContainer>
  );
}

CumulativeTotalValidDefectsDataBlock.propTypes = {
  defects: PropTypes.number,
};

export default CumulativeTotalValidDefectsDataBlock;
