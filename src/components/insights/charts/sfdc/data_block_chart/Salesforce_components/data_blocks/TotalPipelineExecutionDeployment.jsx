import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import ThreeLineScoreDataBlock from "components/common/metrics/score/ThreeLineScoreDataBlock";

function TotalPipelineExecutionDeployment({ score, icon, className, dataPoint, onSelect, lastScore, iconOverlayBody}) {
  return (
    <DataBlockBoxContainer showBorder={true} onClickFunction={onSelect}>
      <ThreeLineScoreDataBlock
        className={`${className} p-3`}
        score={score}
        topText={" Total Deployments"}
        bottomText={"Previous Result: " + lastScore}
        icon={icon}
        iconOverlayBody = {iconOverlayBody}
        dataPoint={dataPoint}

      />
    </DataBlockBoxContainer>
  );
}

TotalPipelineExecutionDeployment.propTypes = {
  score: PropTypes.number,
  icon: PropTypes.object,
  className: PropTypes.string,
  onSelect: PropTypes.func,
  lastScore: PropTypes.number,
  iconOverlayBody: PropTypes.any,
  dataPoint: PropTypes.object,
};

export default TotalPipelineExecutionDeployment;