import React from "react";
import PropTypes from "prop-types";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";

function TotalRegressionTestsDataBlock({ defects }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
      <TwoLineScoreDataBlock
          className="m-3"
          score={defects} 
          subtitle={"Total Number of Regression Test Cases"}
      />
    </DataBlockBoxContainer>
  );
}

TotalRegressionTestsDataBlock.propTypes = {
  defects: PropTypes.number,
};

export default TotalRegressionTestsDataBlock;