import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLineDataBlockBase from "components/common/metrics/data_blocks/base/TwoLineDataBlockBase";
import TwoLineScoreDataBlock from "../../../../../common/metrics/score/TwoLineScoreDataBlock";

function CumulativeTotalValidDefectsDataBlock({ defects }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
        <TwoLineScoreDataBlock
          className={"p-3"}
          score={defects}
          subtitle={"Total Valid Defects Closed"} />
    </DataBlockBoxContainer>
  );
}

CumulativeTotalValidDefectsDataBlock.propTypes = {
  defects: PropTypes.number,
};

export default CumulativeTotalValidDefectsDataBlock;
