import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";

function BoomiTotalExecutionsDataBlock({ data }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
      <TwoLineScoreDataBlock
        className={"p-3 h-100"}
        score={data}
        subtitle={"Total executions"}
      />
    </DataBlockBoxContainer>
  );
}

BoomiTotalExecutionsDataBlock.propTypes = {
  data: PropTypes.number,
};

export default BoomiTotalExecutionsDataBlock;