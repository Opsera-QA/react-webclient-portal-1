import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import ThreeLineScoreDataBlock from "components/common/metrics/score/ThreeLineScoreDataBlock";

function ArtifactsDeployedWithFailedSecurity({ score, icon, className, dataPoint, onSelect, iconOverlayBody}) {
  return (
    <DataBlockBoxContainer showBorder={true} onClickFunction={onSelect}>
      <ThreeLineScoreDataBlock
        className={`${className} p-3`}
        score={score}
        topText={"Artifacts Deployed With Failed Security"}
        icon={icon}
        iconOverlayBody = {iconOverlayBody}
        dataPoint={dataPoint}

      />
    </DataBlockBoxContainer>
  );
}

ArtifactsDeployedWithFailedSecurity.propTypes = {
  score: PropTypes.number,
  icon: PropTypes.object,
  className: PropTypes.string,
  onSelect: PropTypes.func,
  iconOverlayBody: PropTypes.any,
  dataPoint: PropTypes.object,
};

export default ArtifactsDeployedWithFailedSecurity;
