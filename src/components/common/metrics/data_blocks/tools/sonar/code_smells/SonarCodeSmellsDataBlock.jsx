import React from "react";
import PropTypes from "prop-types";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import {faRadiationAlt} from "@fortawesome/pro-light-svg-icons";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";

function SonarCodeSmellsDataBlock({ codeSmellCount, className, }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
      <TwoLineScoreDataBlock
        className={className}
        icon={faRadiationAlt}
        score={codeSmellCount}
        subtitle={"Code Smells"}
      />
    </DataBlockBoxContainer>
  );
}

SonarCodeSmellsDataBlock.propTypes = {
  className: PropTypes.string,
  codeSmellCount: PropTypes.number,
};

export default SonarCodeSmellsDataBlock;
