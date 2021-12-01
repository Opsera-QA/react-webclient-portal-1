import React from "react";
import PropTypes from "prop-types";
import { faCheckCircle } from "@fortawesome/pro-light-svg-icons";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLineDataBlockBase from "components/common/metrics/data_blocks/base/TwoLineDataBlockBase";


function SfdcBackupSuccessDataBlock({ score, subtitle, onClickFunction }) {
  return (
    <DataBlockBoxContainer showBorder={true} onClickFunction={onClickFunction}>
      <div className={'p-3'}>
        <TwoLineDataBlockBase
          className={"success-data-block"}
          title={score}
          subtitle={subtitle}
          icon={faCheckCircle}
        />
      </div>
    </DataBlockBoxContainer>
  );
}
SfdcBackupSuccessDataBlock.propTypes = {
  score: PropTypes.string,
  subtitle: PropTypes.string,
  onClickFunction: PropTypes.func,
};

export default SfdcBackupSuccessDataBlock;
