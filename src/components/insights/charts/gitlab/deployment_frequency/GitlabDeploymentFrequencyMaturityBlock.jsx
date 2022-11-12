import React from "react";
import PropTypes from "prop-types";
import MaturityScoreCardDataBlock from "../../../../common/metrics/data_blocks/base/MaturityScoreCardDataBlock";
import {faInfoCircle} from "@fortawesome/pro-solid-svg-icons";

function GitlabDeploymentFrequencyMaturityBlock({
  maturityScore,
  iconOverlayBody,
  maturityColor,
}) {
  return (
    <MaturityScoreCardDataBlock
      className={`p-1`}
      icon={faInfoCircle}
      text={"Maturity Score: "}
      maturityScore={maturityScore}
      iconOverlayBody={iconOverlayBody}
      maturityColor={maturityColor}
    />
  );
}

GitlabDeploymentFrequencyMaturityBlock.propTypes = {
  maturityScore: PropTypes.string,
  iconOverlayBody: PropTypes.string,
  maturityColor: PropTypes.string
};

export default GitlabDeploymentFrequencyMaturityBlock;
