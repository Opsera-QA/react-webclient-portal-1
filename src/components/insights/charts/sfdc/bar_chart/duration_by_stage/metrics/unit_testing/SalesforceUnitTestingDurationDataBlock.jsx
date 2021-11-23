import React, { useContext } from "react";
import PropTypes from "prop-types";
import ThreeLineDataBlockNoFocusBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockNoFocusBase";
import "../../salesforce-duration-by-stage-kpi.css";
import { getMiddleText, getMiddleStyle } from "../../salesforce-duration-by-stage-utility";

function SalesforceUnitTestingDurationDataBlock({ meanData, countData }) {
  return (
    <ThreeLineDataBlockNoFocusBase
      className="salesforce-duration-by-stage-kpi"
      topText={"Unit Testing"}
      middleText={getMiddleText(meanData, countData)}
    />
  );
}

SalesforceUnitTestingDurationDataBlock.propTypes = {
  meanData: PropTypes.number,
  countData: PropTypes.number,
};

export default SalesforceUnitTestingDurationDataBlock;
