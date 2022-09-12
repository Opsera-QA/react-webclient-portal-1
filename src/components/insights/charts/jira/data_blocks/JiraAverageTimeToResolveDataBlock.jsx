import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";

function JiraAverageTimeToResolveDataBlock({ data, dataPoint }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
      <TwoLineScoreDataBlock
        className={"p-1"}
        score={data}
        subtitle={"Average MTTR (Hours)"}
        dataPoint={dataPoint}
      />
    </DataBlockBoxContainer>
  );
}

JiraAverageTimeToResolveDataBlock.propTypes = {
  data: PropTypes.number,
  dataPoint: PropTypes.object
};

export default JiraAverageTimeToResolveDataBlock;