import React from "react";
import PropTypes from "prop-types";
import TwoLineScoreWithSupportingTextDataBlock from "components/common/metrics/score/TwoLineScoreWithSupportingTextDataBlock";
import { faCheckCircle } from "@fortawesome/pro-light-svg-icons";

function SfdcBackupSuccessDataBlock({ score, subtitle }) {
  return (
    <TwoLineScoreWithSupportingTextDataBlock
      className={"success-data-block"}
      score={score}
      subtitle={subtitle}
      icon={faCheckCircle}
    />
  );
}
SfdcBackupSuccessDataBlock.propTypes = {
  score: PropTypes.string,
  subtitle: PropTypes.string,
};

export default SfdcBackupSuccessDataBlock;
