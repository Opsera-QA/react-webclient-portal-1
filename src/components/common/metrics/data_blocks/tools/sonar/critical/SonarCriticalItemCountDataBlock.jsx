import React from "react";
import PropTypes from "prop-types";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import {faSirenOn} from "@fortawesome/pro-light-svg-icons";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";

function SonarCriticalItemCountDataBlock({ criticalCodeSmellCount, className, }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
      <TwoLineScoreDataBlock
        className={className}
        icon={faSirenOn}
        score={criticalCodeSmellCount}
        subtitle={"Critical"}
      />
    </DataBlockBoxContainer>
  );
}

SonarCriticalItemCountDataBlock.propTypes = {
  className: PropTypes.string,
  criticalCodeSmellCount: PropTypes.number,
};

export default SonarCriticalItemCountDataBlock;
