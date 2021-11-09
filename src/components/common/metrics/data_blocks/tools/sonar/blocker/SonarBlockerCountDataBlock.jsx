import React from "react";
import PropTypes from "prop-types";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import {faBan} from "@fortawesome/pro-light-svg-icons";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";

function SonarBlockerCountDataBlock({ blockerCodeSmellCount, className, }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
      <TwoLineScoreDataBlock
        className={className}
        icon={faBan}
        score={blockerCodeSmellCount}
        subtitle={"Blocker"}
      />
    </DataBlockBoxContainer>
  );
}

SonarBlockerCountDataBlock.propTypes = {
  className: PropTypes.string,
  blockerCodeSmellCount: PropTypes.number,
};

export default SonarBlockerCountDataBlock;
