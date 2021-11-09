import React from "react";
import PropTypes from "prop-types";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import {faBug} from "@fortawesome/pro-light-svg-icons";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";

function SonarBugCountDataBlock({ bugCount, className, }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
      <TwoLineScoreDataBlock
        className={className}
        icon={faBug}
        score={bugCount}
        subtitle={"Bugs"}
      />
    </DataBlockBoxContainer>
  );
}

SonarBugCountDataBlock.propTypes = {
  className: PropTypes.string,
  bugCount: PropTypes.number,
};

export default SonarBugCountDataBlock;
