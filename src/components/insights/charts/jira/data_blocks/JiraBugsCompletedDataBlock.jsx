import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";

function JiraBugsCompletedDataBlock({ data }) {
  return (    
    <DataBlockBoxContainer showBorder={true}>
      <TwoLineScoreDataBlock
        className={"p-3"}
        score={data}
        subtitle={"Bugs Completed"}
      />
    </DataBlockBoxContainer>
  );
}

JiraBugsCompletedDataBlock.propTypes = {
  data: PropTypes.number,
};

export default JiraBugsCompletedDataBlock;
