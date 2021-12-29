import React from "react";
import PropTypes from "prop-types";
import TwoLinePercentageDataBlock from "components/common/metrics/percentage/TwoLinePercentageDataBlock";
import DataBlockBoxContainer from "../../../../../common/metrics/data_blocks/DataBlockBoxContainer";

function AutomatedTestAdoptionRateAdoptionRateDataBlock({ score, adoptionRateDataPoint }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
      <div className={"p-3"}>
        <TwoLinePercentageDataBlock dataPoint={adoptionRateDataPoint} percentage={score} subtitle={"Adoption Percentage"} />
      </div>
    </DataBlockBoxContainer>
  );
}

AutomatedTestAdoptionRateAdoptionRateDataBlock.propTypes = {
  score: PropTypes.string,
  adoptionRateDataPoint: PropTypes.object,
};

export default AutomatedTestAdoptionRateAdoptionRateDataBlock;
