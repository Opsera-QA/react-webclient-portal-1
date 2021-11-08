import React, { useContext } from "react";
import PropTypes from "prop-types";
import ThreeLineDataBlockNoFocusBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockNoFocusBase";

function SalesforceUnitTestingDurationDataBlock({ meanData, countData }) {
  const getMiddleText = (meanData, countData) => {
    if (meanData && countData) {
      return meanData + " min | " + countData + " runs";
    }
    if (meanData) {
      return meanData + " min | 0";
    }
    return "No runs";
  };

  return <ThreeLineDataBlockNoFocusBase topText={"Unit Testing"} middleText={getMiddleText(meanData, countData)} />;
}

SalesforceUnitTestingDurationDataBlock.propTypes = {
  meanData: PropTypes.number,
  countData: PropTypes.number,
};

export default SalesforceUnitTestingDurationDataBlock;
