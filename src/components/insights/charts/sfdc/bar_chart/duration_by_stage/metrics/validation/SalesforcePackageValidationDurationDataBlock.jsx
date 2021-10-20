import React from "react";
import PropTypes from "prop-types";
import ThreeLineDataBlockNoFocusBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockNoFocusBase";

function SalesforcePackageValidationDurationDataBlock({dataBlockValues, goalsData}) {

  return (
    <ThreeLineDataBlockNoFocusBase
    topStyle={{color: "brown"}}
    topText={"Package Validation"}
    middleText={dataBlockValues[0]?.validate_package_mean ? dataBlockValues[0]?.validate_package_mean + " min | " + dataBlockValues[0]?.validate_package_count : "N/A"}
  />
  );
}

SalesforcePackageValidationDurationDataBlock.propTypes = {
    dataBlockValues: PropTypes.array,
    goalsData: PropTypes.object
};

export default SalesforcePackageValidationDurationDataBlock;
