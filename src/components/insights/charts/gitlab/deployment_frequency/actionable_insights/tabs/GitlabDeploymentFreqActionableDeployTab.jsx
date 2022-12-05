import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import VanitySetTabViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabViewContainer";
import VanitySetTabContentContainer from "components/common/tabs/vertical_tabs/VanitySetTabContentContainer";
import GitlabDeploymentActionableDeployOverlay from "../GitlabDeploymentActionableDeployOverlay";

function GitlabDeploymentFreqDeployTab({dashboardData, kpiConfiguration, start, end, range, icon, average}) {
  const getTabContentContainer = () => {
    return (
      <VanitySetTabViewContainer className={"mb-3"}>
        <GitlabDeploymentActionableDeployOverlay
            dashboardData={dashboardData}
            kpiConfiguration={kpiConfiguration}
            start={start}
            end={end}
            range={range}
            icon={icon}
            average={average}
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
GitlabDeploymentFreqDeployTab.propTypes = {
  dashboardData: PropTypes.object,
  kpiConfiguration: PropTypes.object,
  start: PropTypes.string,
  end: PropTypes.string,
  range: PropTypes.string,
  average: PropTypes.number,
  icon: PropTypes.object
};
export default GitlabDeploymentFreqDeployTab;

