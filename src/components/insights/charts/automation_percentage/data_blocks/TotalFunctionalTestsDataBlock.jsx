import React from "react";
import PropTypes from "prop-types";
import TwoLineDataBlockBase from "components/common/metrics/data_blocks/base/TwoLineDataBlockBase";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLineScoreDataBlock from "../../../../common/metrics/score/TwoLineScoreDataBlock";

function TotalFunctionalTestsDataBlock({ defects, dataPoint }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
        <TwoLineScoreDataBlock
          className="p-2"
          style={{minHeight: '100px'}}
          score={defects}
          dataPoint={dataPoint}
          subtitle={"Total Number of Functional Test Cases"}
        />
    </DataBlockBoxContainer>
  );
}

TotalFunctionalTestsDataBlock.propTypes = {
  defects: PropTypes.number,
  dataPoint: PropTypes.object
};

export default TotalFunctionalTestsDataBlock;