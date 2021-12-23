import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";

function JiraMeanLeadTimeDataBlock({ data }) {
  return (
    <DataBlockBoxContainer showBorder={true}>      
      <TwoLineScoreDataBlock
        className={"p-3"}
        score={data}
        subtitle={"Mean Lead Time (Days)"}
      />
    </DataBlockBoxContainer>
  );
}

JiraMeanLeadTimeDataBlock.propTypes = {
  data: PropTypes.number,
};

export default JiraMeanLeadTimeDataBlock;
