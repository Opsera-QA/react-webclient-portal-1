import React from "react";
import PropTypes from "prop-types";
import TwoLineScoreWithSupportingTextDataBlock from "components/common/metrics/score/TwoLineScoreWithSupportingTextDataBlock";
import { faTimesCircle } from "@fortawesome/pro-light-svg-icons";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";

function SfdcBackupFailureDataBlock({ score, subtitle }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
      <TwoLineScoreWithSupportingTextDataBlock
        className={"failure-data-block"}
        score={score}
        subtitle={subtitle}
        icon={faTimesCircle}
      />
    </DataBlockBoxContainer>
  );
}
SfdcBackupFailureDataBlock.propTypes = {
  score: PropTypes.string,
  subtitle: PropTypes.string,
};

export default SfdcBackupFailureDataBlock;
