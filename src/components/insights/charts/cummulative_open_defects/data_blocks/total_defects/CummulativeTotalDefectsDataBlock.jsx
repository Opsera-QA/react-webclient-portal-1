import React from "react";
import PropTypes from "prop-types";
import TwoLineDataBlockBase from "components/common/metrics/data_blocks/base/TwoLineDataBlockBase";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";

function CummulativeTotalDefectsDataBlock({ defects }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
      <div className={"p-3"}>
        <TwoLineDataBlockBase title={defects} subtitle={"Total No of Defects"} />
      </div>
    </DataBlockBoxContainer>
  );
}

CummulativeTotalDefectsDataBlock.propTypes = {
  defects: PropTypes.number,
};

export default CummulativeTotalDefectsDataBlock;
