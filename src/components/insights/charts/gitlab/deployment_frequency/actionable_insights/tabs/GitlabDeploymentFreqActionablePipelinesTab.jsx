import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import VanitySetTabViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabViewContainer";
import VanitySetTabContentContainer from "components/common/tabs/vertical_tabs/VanitySetTabContentContainer";
import GitlabDeploymentActionablePipelinesOverlay from "../GitlabDeploymentActionablePipelinesOverlay";

function GitlabDeploymentFreqPipelinesTab({dashboardData, kpiConfiguration, start, end, range, icon}) {

  const getTabContentContainer = () => {
    return (
      <VanitySetTabViewContainer className={"mb-3"}>
        <GitlabDeploymentActionablePipelinesOverlay
            dashboardData={dashboardData}
            kpiConfiguration={kpiConfiguration}
            start={start}
            end={end}
            range={range}
            icon={icon}
        />
      </VanitySetTabViewContainer>
    );
  };


  return (
    <VanitySetTabContentContainer>
      {getTabContentContainer()}
    </VanitySetTabContentContainer>
  );

}
GitlabDeploymentFreqPipelinesTab.propTypes = {
  dashboardData: PropTypes.object,
  kpiConfiguration: PropTypes.object,
  icon: PropTypes.object,
  start: PropTypes.string,
  end: PropTypes.string,
  range: PropTypes.string,
};
export default GitlabDeploymentFreqPipelinesTab;

