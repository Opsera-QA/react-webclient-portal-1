import React from "react";
import PropTypes from "prop-types";
import TwoLineDataBlockBase from "components/common/metrics/data_blocks/base/TwoLineDataBlockBase";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLineScoreDataBlock from "../../../../../common/metrics/score/TwoLineScoreDataBlock";

function CumulativeOpenValidDefectsDataBlock({ defects }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
        <TwoLineScoreDataBlock
          className={"p-3"}
          score={defects}
          subtitle={"Total Valid Defects Open"} />
    </DataBlockBoxContainer>
  );
}

CumulativeOpenValidDefectsDataBlock.propTypes = {
  defects: PropTypes.number,
};

export default CumulativeOpenValidDefectsDataBlock;
