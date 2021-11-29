import React from "react";
import PropTypes from "prop-types";
import TwoLineScoreWithSupportingTextDataBlock from "components/common/metrics/score/TwoLineScoreWithSupportingTextDataBlock";
import { faCheckCircle } from "@fortawesome/pro-light-svg-icons";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";

function SfdcBackupSuccessDataBlock({ score, subtitle }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
      <TwoLineScoreWithSupportingTextDataBlock
        className={"success-data-block"}
        score={score}
        subtitle={subtitle}
        icon={faCheckCircle}
      />
    </DataBlockBoxContainer>
  );
}
SfdcBackupSuccessDataBlock.propTypes = {
  score: PropTypes.string,
  subtitle: PropTypes.string,
};

export default SfdcBackupSuccessDataBlock;
