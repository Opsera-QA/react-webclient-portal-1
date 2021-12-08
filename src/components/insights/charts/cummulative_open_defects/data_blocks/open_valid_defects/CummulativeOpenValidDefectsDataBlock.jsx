import React from "react";
import PropTypes from "prop-types";
import TwoLineDataBlockBase from "components/common/metrics/data_blocks/base/TwoLineDataBlockBase";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";

function CummulativeOpenValidDefectsDataBlock({ defects }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
      <div className={"p-3"}>
        <TwoLineDataBlockBase title={defects} subtitle={"Total Valid Defects Open"} />
      </div>
    </DataBlockBoxContainer>
  );
}

CummulativeOpenValidDefectsDataBlock.propTypes = {
  defects: PropTypes.number,
};

export default CummulativeOpenValidDefectsDataBlock;
