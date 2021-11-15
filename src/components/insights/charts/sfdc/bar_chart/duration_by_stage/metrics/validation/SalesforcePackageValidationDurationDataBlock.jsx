import React from "react";
import PropTypes from "prop-types";
import ThreeLineDataBlockNoFocusBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockNoFocusBase";
import { getMiddleText, getMiddleStyle } from "../../salesforce-duration-by-stage-utility";

function SalesforcePackageValidationDurationDataBlock({ meanData, countData }) {
  return (
    <ThreeLineDataBlockNoFocusBase
      className="salesforce-duration-by-stage-kpi"
      topText={"Package Validation"}
      middleText={getMiddleText(meanData, countData)}
    />
  );
}

SalesforcePackageValidationDurationDataBlock.propTypes = {
  meanData: PropTypes.number,
  countData: PropTypes.number,
};

export default SalesforcePackageValidationDurationDataBlock;
