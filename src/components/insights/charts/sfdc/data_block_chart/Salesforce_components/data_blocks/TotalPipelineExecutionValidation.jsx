import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import ThreeLineScoreDataBlock from "../../../../../../common/metrics/score/ThreeLineScoreDataBlock";

function TotalPipelineExecutionValidation({ score, icon, className, onSelect, lastScore, iconOverlayBody}) {
  return (
    <DataBlockBoxContainer showBorder={true} onClickFunction={onSelect}>
      <ThreeLineScoreDataBlock
        className={`${className} p-2`}
        score={score}
        topText={"Total Pipelines Executions with Validation"}
        bottomText={"Last Scan: " + lastScore}
        icon={icon}
        iconOverlayBody = {iconOverlayBody}

      />
    </DataBlockBoxContainer>
  );
}

TotalPipelineExecutionValidation.propTypes = {
  score: PropTypes.number,
  icon: PropTypes.object,
  className: PropTypes.string,
  onSelect: PropTypes.func,
  lastScore: PropTypes.number,
  iconOverlayBody: PropTypes.any,
};

export default TotalPipelineExecutionValidation;