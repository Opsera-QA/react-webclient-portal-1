import React from "react";
import PropTypes from "prop-types";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import {faExclamationTriangle} from "@fortawesome/pro-light-svg-icons";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";

function SonarMajorCountDataBlock({ majorCodeSmellCount, className, }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
      <TwoLineScoreDataBlock
        className={className}
        icon={faExclamationTriangle}
        score={majorCodeSmellCount}
        subtitle={"Major"}
      />
    </DataBlockBoxContainer>
  );
}

SonarMajorCountDataBlock.propTypes = {
  className: PropTypes.string,
  majorCodeSmellCount: PropTypes.number,
};

export default SonarMajorCountDataBlock;
