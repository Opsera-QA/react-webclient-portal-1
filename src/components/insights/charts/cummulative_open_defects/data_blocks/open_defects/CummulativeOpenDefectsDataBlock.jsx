import React from "react";
import PropTypes from "prop-types";
import TwoLinePercentageDataBlock from "components/common/metrics/percentage/TwoLinePercentageDataBlock";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";

function CummulativeOpenDefectsDataBlock({ defects, dataPoint }) {
  console.log(dataPoint,'****');
  return (
    <DataBlockBoxContainer showBorder={true}>
      <div className={"p-3"}>
        <TwoLinePercentageDataBlock
          percentage={defects}
          subtitle={"Cumulative Open Defects"}
          dataPoint={dataPoint}
          className={"failure-data-block"}
        />
      </div>
    </DataBlockBoxContainer>
  );
}

CummulativeOpenDefectsDataBlock.propTypes = {
  defects: PropTypes.number,
  dataPoint: PropTypes.object,
};

export default CummulativeOpenDefectsDataBlock;
