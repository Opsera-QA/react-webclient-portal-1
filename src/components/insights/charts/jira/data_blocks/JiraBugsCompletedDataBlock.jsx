import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import ThreeLineScoreDataBlock from "components/common/metrics/score/ThreeLineScoreDataBlock";

function JiraBugsCompletedDataBlock({ data, previousData }) {
  return (    
    <DataBlockBoxContainer showBorder={true}>
      <ThreeLineScoreDataBlock
        className={"p-3"}
        score={data}
        topText={"Bugs Completed"}
        bottomText={"Previous Bugs: " + previousData} 
      />
    </DataBlockBoxContainer>
  );
}

JiraBugsCompletedDataBlock.propTypes = {
  data: PropTypes.number,
  previousData: PropTypes.number
};

export default JiraBugsCompletedDataBlock;
