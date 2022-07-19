import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";

function BoomiAverageDurationDataBlock({ data }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
      <TwoLineScoreDataBlock
        className={"p-3 h-100"}
        score={data}
        subtitle={"Average Duration"}
      />
    </DataBlockBoxContainer>
  );
}

BoomiAverageDurationDataBlock.propTypes = {
  data: PropTypes.number,
};

export default BoomiAverageDurationDataBlock;