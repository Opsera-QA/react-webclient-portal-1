import React from 'react';
import PropTypes from "prop-types";
import { faTimesCircle } from "@fortawesome/pro-light-svg-icons";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";

function FailedBuildsDeployments({ displayValue, displayText }) {
  return (   
    <DataBlockBoxContainer showBorder={true}>
      <TwoLineScoreDataBlock
        icon={faTimesCircle}
        score={displayValue}
        subtitle={displayText}
      />
    </DataBlockBoxContainer>
  );
}

FailedBuildsDeployments.propTypes = {
  displayValue: PropTypes.string,
  displayText: PropTypes.string,
};

export default FailedBuildsDeployments;
