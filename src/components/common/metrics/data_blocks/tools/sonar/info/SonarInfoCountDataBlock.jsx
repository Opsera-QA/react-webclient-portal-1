import React from "react";
import PropTypes from "prop-types";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import {faInfoCircle} from "@fortawesome/pro-light-svg-icons";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";

function SonarInfoCountDataBlock({ infoCodeSmellCount, className, }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
      <TwoLineScoreDataBlock
        className={className}
        icon={faInfoCircle}
        score={infoCodeSmellCount}
        subtitle={"Info"}
      />
    </DataBlockBoxContainer>
  );
}

SonarInfoCountDataBlock.propTypes = {
  className: PropTypes.string,
  infoCodeSmellCount: PropTypes.number,
};

export default SonarInfoCountDataBlock;
