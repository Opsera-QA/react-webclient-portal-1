import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import VanitySetTabViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabViewContainer";
import VanitySetTabContentContainer from "components/common/tabs/vertical_tabs/VanitySetTabContentContainer";
import GitlabDeploymentActionablePipelinesOverlay from "./GitlabDeploymentActionablePipelinesOverlay";

function GitlabDeploymentActionablePipelinesTab({dashboardData, kpiConfiguration,icon}) {

    const getTabContentContainer = () => {
        return (
            <VanitySetTabViewContainer className={"mb-3"}>
                <GitlabDeploymentActionablePipelinesOverlay
                    priority={1}
                    dashboardData={dashboardData}
                    kpiConfiguration={kpiConfiguration}
                    icon={icon}
                />
            </VanitySetTabViewContainer>
        );
    };


    return (
        <VanitySetTabContentContainer title={`Gitlab Pipelines Actionable Report`}>
            {getTabContentContainer()}
        </VanitySetTabContentContainer>
    );

}
GitlabDeploymentActionablePipelinesTab.propTypes = {
    highestMergesMetric: PropTypes.array,
    dashboardData: PropTypes.object,
    kpiConfiguration: PropTypes.object,
    icon: PropTypes.object
};
export default GitlabDeploymentActionablePipelinesTab;

