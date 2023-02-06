import React from "react";
import PropTypes from "prop-types";
import MaturityScoreCardDataBlock from "../../../../common/metrics/data_blocks/base/MaturityScoreCardDataBlock";
import {faInfoCircle} from "@fortawesome/pro-solid-svg-icons";

function GitlabDeploymentFrequencyMaturityBlock({
  maturityScore,
  iconOverlayBody,
  maturityColor,
  onClick,
}) {
  return (
    <MaturityScoreCardDataBlock
      className={`p-1`}
      icon={faInfoCircle}
      text={"Maturity Score: "}
      maturityScore={maturityScore}
      iconOverlayBody={iconOverlayBody}
      maturityColor={maturityColor}
      onClick={onClick}
    />
  );
}

GitlabDeploymentFrequencyMaturityBlock.propTypes = {
  maturityScore: PropTypes.string,
  iconOverlayBody: PropTypes.string,
  maturityColor: PropTypes.string,
  onClick: PropTypes.func
};

export default GitlabDeploymentFrequencyMaturityBlock;
