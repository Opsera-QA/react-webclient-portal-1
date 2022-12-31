import React from "react";
import PropTypes from "prop-types";
import TwoLineDataBlockBase from "components/common/metrics/data_blocks/base/TwoLineDataBlockBase";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLineScoreDataBlock from "../../../../../common/metrics/score/TwoLineScoreDataBlock";

function CumulativeTotalDefectsDataBlock({ defects }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
        <TwoLineScoreDataBlock
          className={"p-3"}
          score={defects}
          subtitle={"Total No of Defects"} />
    </DataBlockBoxContainer>
  );
}

CumulativeTotalDefectsDataBlock.propTypes = {
  defects: PropTypes.number,
};

export default CumulativeTotalDefectsDataBlock;
