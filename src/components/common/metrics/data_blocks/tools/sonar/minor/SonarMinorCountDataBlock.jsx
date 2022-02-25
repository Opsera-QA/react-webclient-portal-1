import React from "react";
import PropTypes from "prop-types";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import {faExclamation} from "@fortawesome/pro-light-svg-icons";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";

function SonarMinorCountDataBlock({ minorCodeSmellCount, className, }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
      <TwoLineScoreDataBlock
        className={className}
        icon={faExclamation}
        score={minorCodeSmellCount}
        subtitle={"Minor"}
      />
    </DataBlockBoxContainer>
  );
}

SonarMinorCountDataBlock.propTypes = {
  className: PropTypes.string,
  minorCodeSmellCount: PropTypes.number,
};

export default SonarMinorCountDataBlock;
