import React, {useContext} from "react";
import PropTypes from "prop-types";
import ThreeLineDataBlockNoFocusBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockNoFocusBase";

function SalesforceUnitTestingDurationDataBlock({dataBlockValues, goalsData}) {

  return (
    <ThreeLineDataBlockNoFocusBase
    topText={"Unit Testing"}
    middleText={dataBlockValues[0]?.unit_testing_mean ? dataBlockValues[0]?.unit_testing_mean + " min | " +  dataBlockValues[0]?.unit_testing_count + " runs": "N/A"}
  />
  );
}

SalesforceUnitTestingDurationDataBlock.propTypes = {
    dataBlockValues: PropTypes.array,
    goalsData: PropTypes.object
};

export default SalesforceUnitTestingDurationDataBlock;
