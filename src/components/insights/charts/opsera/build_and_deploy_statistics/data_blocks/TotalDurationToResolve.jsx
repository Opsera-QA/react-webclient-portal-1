import React from 'react';
import PropTypes from "prop-types";
import { faClock } from "@fortawesome/pro-light-svg-icons";
import TwoLineScoreWithSupportingTextDataBlock from "components/common/metrics/score/TwoLineScoreWithSupportingTextDataBlock";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";

function TotalDurationToResolve({ displayValue, displayText }) {
  return (    
    <DataBlockBoxContainer showBorder={true}>
      <TwoLineScoreWithSupportingTextDataBlock
        icon={faClock}
        score={displayValue}
        supportingText=" hrs"
        subtitle={displayText}
      />
    </DataBlockBoxContainer>
  );
}

TotalDurationToResolve.propTypes = {
  displayValue: PropTypes.string,
  displayText: PropTypes.string,
};

TotalDurationToResolve.defaultProps = {
  displayText: "Total Duration to Resolve"
};

export default TotalDurationToResolve;
