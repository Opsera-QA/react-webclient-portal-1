import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";

function ServiceNowAverageTimeToResolveDataBlock({ data }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
      <TwoLineScoreDataBlock
        className={"p-1"}
        score={data}
        subtitle={"Average MTTR (Hours)"}
      />
    </DataBlockBoxContainer>
  );
}

ServiceNowAverageTimeToResolveDataBlock.propTypes = {
  data: PropTypes.number,
};

export default ServiceNowAverageTimeToResolveDataBlock;