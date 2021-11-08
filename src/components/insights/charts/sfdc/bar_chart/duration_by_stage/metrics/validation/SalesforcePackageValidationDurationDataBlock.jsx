import React from "react";
import PropTypes from "prop-types";
import ThreeLineDataBlockNoFocusBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockNoFocusBase";

function SalesforcePackageValidationDurationDataBlock({ meanData, countData }) {
  return (
    <ThreeLineDataBlockNoFocusBase
      topText={"Package Validation"}
      middleText={meanData ? meanData + " min | " + countData + " runs" : "N/A | 0"}
    />
  );
}

SalesforcePackageValidationDurationDataBlock.propTypes = {
  meanData: PropTypes.number,
  countData: PropTypes.number,
};

export default SalesforcePackageValidationDurationDataBlock;
