import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLineDataBlockBase from "components/common/metrics/data_blocks/base/TwoLineDataBlockBase";

function DefectRemovalEfficiencyDataBlockBase({ score, subtitle, onClickFunction }) {
  return (
    <DataBlockBoxContainer showBorder={true} onClickFunction={onClickFunction}>
      <div className={"p-3"}>
        <TwoLineDataBlockBase className={"defect-removal-efficiency"} title={score} subtitle={subtitle} />
      </div>
    </DataBlockBoxContainer>
  );
}
DefectRemovalEfficiencyDataBlockBase.propTypes = {
  score: PropTypes.string,
  subtitle: PropTypes.string,
  onClickFunction: PropTypes.func,
};

export default DefectRemovalEfficiencyDataBlockBase;
