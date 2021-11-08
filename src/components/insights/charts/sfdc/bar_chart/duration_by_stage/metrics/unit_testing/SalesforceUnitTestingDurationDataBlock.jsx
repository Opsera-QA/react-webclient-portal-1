import React, { useContext } from "react";
import PropTypes from "prop-types";
import ThreeLineDataBlockNoFocusBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockNoFocusBase";

function SalesforceUnitTestingDurationDataBlock({ meanData, countData }) {
  return (
    <ThreeLineDataBlockNoFocusBase
      topText={"Unit Testing"}
      middleText={meanData ? meanData + " min | " + countData + " runs" : "N/A | 0"}
    />
  );
}

SalesforceUnitTestingDurationDataBlock.propTypes = {
  meanData: PropTypes.number,
  countData: PropTypes.number,
};

export default SalesforceUnitTestingDurationDataBlock;
