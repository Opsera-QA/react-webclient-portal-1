import React from 'react';
import PropTypes from "prop-types";
import { faTools } from "@fortawesome/pro-light-svg-icons";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";

function TotalBuilds({ displayValue, displayText }) {
  return (    
    <DataBlockBoxContainer showBorder={true}>
      <TwoLineScoreDataBlock        
        icon={faTools}
        score={displayValue}
        subtitle={displayText}
      />
    </DataBlockBoxContainer>
  );
}

TotalBuilds.propTypes = {
  displayValue: PropTypes.string,
  displayText: PropTypes.string,
};

export default TotalBuilds;

