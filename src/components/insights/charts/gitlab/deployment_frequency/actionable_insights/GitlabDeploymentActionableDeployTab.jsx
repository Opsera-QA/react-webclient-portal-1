import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import VanitySetTabViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabViewContainer";
import VanitySetTabContentContainer from "components/common/tabs/vertical_tabs/VanitySetTabContentContainer";
import GitlabDeploymentActionableDeployOverlay from "./GitlabDeploymentActionableDeployOverlay";

function GitlabDeploymentActionableDeployTab({dashboardData, kpiConfiguration, icon}) {

    const getTabContentContainer = () => {
        return (
            <VanitySetTabViewContainer className={"mb-3"}>
                <GitlabDeploymentActionableDeployOverlay
                    priority={1}
                    dashboardData={dashboardData}
                    kpiConfiguration={kpiConfiguration}
                    icon={icon}
                />
            </VanitySetTabViewContainer>
        );
    };


    return (
        <VanitySetTabContentContainer title={`Gitlab Deployments Actionable Report`}>
            {getTabContentContainer()}
        </VanitySetTabContentContainer>
    );

}
GitlabDeploymentActionableDeployTab.propTypes = {
    highestMergesMetric: PropTypes.array,
    dashboardData: PropTypes.object,
    kpiConfiguration: PropTypes.object,
    icon: PropTypes.object
};
export default GitlabDeploymentActionableDeployTab;

