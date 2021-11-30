import React from "react";
import PropTypes from "prop-types";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";

function AdoptionTestPercentageAdoptionPercentageDataBlock({adoptionRatePercentage, adoptionRateDataPoint}) {
  return (
    <TwoLineScoreDataBlock
      score={adoptionRatePercentage}
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
