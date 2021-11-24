import React from "react";
import PropTypes from "prop-types";
import TwoLineScoreWithSupportingTextDataBlock from "components/common/metrics/score/TwoLineScoreWithSupportingTextDataBlock";
import { faTimesCircle } from "@fortawesome/pro-light-svg-icons";

function SfdcBackupFailureDataBlock({ score, subtitle }) {
  return (
    <TwoLineScoreWithSupportingTextDataBlock
      className={"failure-data-block"}
      score={score}
      subtitle={subtitle}
      icon={faTimesCircle}
    />
  );
}
SfdcBackupFailureDataBlock.propTypes = {
  score: PropTypes.string,
  subtitle: PropTypes.string,
};

export default SfdcBackupFailureDataBlock;
