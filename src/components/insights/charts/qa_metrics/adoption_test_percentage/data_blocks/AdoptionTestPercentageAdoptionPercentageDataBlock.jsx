import React from "react";
import PropTypes from "prop-types";
import TwoLinePercentageDataBlock from "components/common/metrics/percentage/TwoLinePercentageDataBlock";

function AdoptionTestPercentageAdoptionPercentageDataBlock({adoptionRatePercentage, adoptionRateDataPoint}) {
  return (
    <TwoLinePercentageDataBlock
      percentage={adoptionRatePercentage}
      subtitle={"Adoption Percentage"}
      dataPoint={adoptionRateDataPoint}
    />
  );
}

AdoptionTestPercentageAdoptionPercentageDataBlock.propTypes = {
  adoptionRatePercentage: PropTypes.number,
  adoptionRateDataPoint: PropTypes.object,
};

export default AdoptionTestPercentageAdoptionPercentageDataBlock;
