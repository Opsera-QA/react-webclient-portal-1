import React from "react";
import PropTypes from "prop-types";
import TwoLinePercentageDataBlock from "components/common/metrics/percentage/TwoLinePercentageDataBlock";

function AutomatedTestAdoptionRateAdoptionRateDataBlock({adoptionRatePercentage, adoptionRateDataPoint}) {
  return (
    <TwoLinePercentageDataBlock
      percentage={adoptionRatePercentage}
      subtitle={"Adoption Percentage"}
      dataPoint={adoptionRateDataPoint}
    />
  );
}

AutomatedTestAdoptionRateAdoptionRateDataBlock.propTypes = {
  adoptionRatePercentage: PropTypes.number,
  adoptionRateDataPoint: PropTypes.object,
};

export default AutomatedTestAdoptionRateAdoptionRateDataBlock;
