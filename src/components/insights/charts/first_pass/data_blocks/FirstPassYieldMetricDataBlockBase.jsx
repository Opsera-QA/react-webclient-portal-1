import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLineDataBlockBase from "components/common/metrics/data_blocks/base/TwoLineDataBlockBase";

function FirstPassYieldMetricDataBlockBase({ score, subtitle, onClickFunction }) {
  return (
    <DataBlockBoxContainer showBorder={true} onClickFunction={onClickFunction}>
      <div className={"p-3"}>
        <TwoLineDataBlockBase className={"first-pass-yield"} title={score} subtitle={subtitle} />
      </div>
    </DataBlockBoxContainer>
  );
}
FirstPassYieldMetricDataBlockBase.propTypes = {
  score: PropTypes.string,
  subtitle: PropTypes.string,
  onClickFunction: PropTypes.func,
};

export default FirstPassYieldMetricDataBlockBase;
