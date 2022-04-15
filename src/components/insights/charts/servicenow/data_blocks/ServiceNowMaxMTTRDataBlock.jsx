import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";

function ServiceNowMaxMTTRDataBlock({ data }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
      <TwoLineScoreDataBlock
        className={"p-1"}
        score={data}
        subtitle={"Max MTTR (Hours)"}
      />
    </DataBlockBoxContainer>
  );
}

ServiceNowMaxMTTRDataBlock.propTypes = {
  data: PropTypes.number,
};

export default ServiceNowMaxMTTRDataBlock;