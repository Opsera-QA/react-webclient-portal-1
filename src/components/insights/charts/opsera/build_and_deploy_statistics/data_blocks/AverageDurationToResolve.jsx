import React from 'react';
import PropTypes from "prop-types";
import { faClock } from "@fortawesome/pro-light-svg-icons";
import TwoLineScoreWithSupportingTextDataBlock from "components/common/metrics/score/TwoLineScoreWithSupportingTextDataBlock";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";

function AverageDurationToResolve({ displayValue, displayText }) {
  return (    
    <DataBlockBoxContainer showBorder={true}>
      <TwoLineScoreWithSupportingTextDataBlock
        className="danger-red"        
        icon={faClock}
        score={displayValue}
        supportingText=" hrs"
        subtitle={displayText}
      />
    </DataBlockBoxContainer>
  );
}

AverageDurationToResolve.propTypes = {
  displayValue: PropTypes.string,
  displayText: PropTypes.string,
};

AverageDurationToResolve.defaultProps = {
  displayText: "Average Duration to Resolve"
};

export default AverageDurationToResolve;
