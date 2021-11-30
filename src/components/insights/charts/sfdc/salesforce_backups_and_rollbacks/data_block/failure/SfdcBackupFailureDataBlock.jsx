import React from "react";
import PropTypes from "prop-types";
import { faTimesCircle } from "@fortawesome/pro-light-svg-icons";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLineDataBlockBase from "components/common/metrics/data_blocks/base/TwoLineDataBlockBase";

function SfdcBackupFailureDataBlock({ score, subtitle, onClickFunction }) {
  return (
    <DataBlockBoxContainer showBorder={true} onClickFunction={onClickFunction}>
      <TwoLineDataBlockBase
        className={"failure-data-block"}
        title={score}
        subtitle={subtitle}
        icon={faTimesCircle}
      />
    </DataBlockBoxContainer>
  );
}
SfdcBackupFailureDataBlock.propTypes = {
  score: PropTypes.string,
  subtitle: PropTypes.string,
  onClickFunction: PropTypes.func,
};

export default SfdcBackupFailureDataBlock;
