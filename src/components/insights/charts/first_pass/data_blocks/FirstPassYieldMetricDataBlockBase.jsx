import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLineDataBlockBase from "components/common/metrics/data_blocks/base/TwoLineDataBlockBase";
import TwoLineScoreDataBlock from "../../../../common/metrics/score/TwoLineScoreDataBlock";

function FirstPassYieldMetricDataBlockBase({ score, subtitle, onClickFunction }) {
  return (
    <DataBlockBoxContainer showBorder={true} onClickFunction={onClickFunction}>
        <TwoLineScoreDataBlock
          className={"p-2 first-pass-yield"}
          score={score}
          subtitle={subtitle} />
    </DataBlockBoxContainer>
  );
}
FirstPassYieldMetricDataBlockBase.propTypes = {
  score: PropTypes.string,
  subtitle: PropTypes.string,
  onClickFunction: PropTypes.func,
};

export default FirstPassYieldMetricDataBlockBase;
