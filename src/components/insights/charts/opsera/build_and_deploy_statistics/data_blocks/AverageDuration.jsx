import React from 'react';
import PropTypes from "prop-types";
import { faClock } from "@fortawesome/pro-light-svg-icons";
import TwoLineScoreWithSupportingTextDataBlock from "components/common/metrics/score/TwoLineScoreWithSupportingTextDataBlock";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";

function AverageDuration({ displayValue, displayText }) {
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

AverageDuration.propTypes = {
  displayValue: PropTypes.string,
  displayText: PropTypes.string,
};

AverageDuration.defaultProps = {
  displayText: "Average Duration"
};

export default AverageDuration;
