import React from "react";
import PropTypes from "prop-types";
import ThreeLineDataBlockNoFocusBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockNoFocusBase";
import "../../salesforce-duration-by-stage-kpi.css";
import { getMiddleText, getMiddleStyle } from "../../salesforce-duration-by-stage-utility";

function SalesforceProfileMigrationDurationDataBlock({ meanData, countData }) {
  return (
    <ThreeLineDataBlockNoFocusBase
      className="salesforce-duration-by-stage-kpi"
      topText={"Profile Migration"}
      middleText={getMiddleText(meanData, countData)}
    />
  );
}

SalesforceProfileMigrationDurationDataBlock.propTypes = {
  meanData: PropTypes.number,
  countData: PropTypes.number,
};

export default SalesforceProfileMigrationDurationDataBlock;
