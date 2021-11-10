import React from 'react';
import PropTypes from "prop-types";
import { faCheckCircle } from "@fortawesome/pro-light-svg-icons";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";

function SuccessfulBuildsDeployments({ displayValue, displayText }) {
  return (   
    <DataBlockBoxContainer showBorder={true}>
      <TwoLineScoreDataBlock              
        icon={faCheckCircle}
        score={displayValue}
        subtitle={displayText}
      />
    </DataBlockBoxContainer>
  );
}

SuccessfulBuildsDeployments.propTypes = {
  displayValue: PropTypes.string,
  displayText: PropTypes.string,
};

export default SuccessfulBuildsDeployments;
