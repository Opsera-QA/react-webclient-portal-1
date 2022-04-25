import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import ThreeLineScoreDataBlock from "../../../../../../common/metrics/score/ThreeLineScoreDataBlock";

function TotalPipelinesExecutionsUnitTests({ score, icon, className, onSelect, lastScore, iconOverlayBody}) {
  return (
    <DataBlockBoxContainer showBorder={true} onClickFunction={onSelect}>
      <ThreeLineScoreDataBlock
        className={`${className} p-2`}
        score={score}
        topText={"Total Pipelines Executions with Unit Test"}
        bottomText={"Last Scan: " + lastScore}
        icon={icon}
        iconOverlayBody = {iconOverlayBody}

      />
    </DataBlockBoxContainer>
  );
}

TotalPipelinesExecutionsUnitTests.propTypes = {
  score: PropTypes.number,
  icon: PropTypes.object,
  className: PropTypes.string,
  onSelect: PropTypes.func,
  lastScore: PropTypes.number,
  iconOverlayBody: PropTypes.any,
};

export default TotalPipelinesExecutionsUnitTests;