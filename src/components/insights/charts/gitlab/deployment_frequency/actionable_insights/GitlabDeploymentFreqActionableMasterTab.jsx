import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import { faTable, faCodeCommit, faBook, faCodeMerge } from "@fortawesome/pro-light-svg-icons";
import TabPanelContainer from "components/common/panels/general/TabPanelContainer";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import GitlabDeploymentActionablePipelinesTab from "./GitlabDeploymentActionablePipelinesTab";
import GitlabDeploymentActionableDeployTab from "./GitlabDeploymentActionableDeployTab";

function GitlabDeploymentFreqActionableMasterTab({ kpiConfiguration, dashboardData }) {
    const toastContext = useContext(DialogToastContext);
    const [activeTab, setActiveTab] = useState("one");

    const closePanel = () => {
        toastContext.removeInlineMessage();
        toastContext.clearOverlayPanel();
    };

    const getBody = () => {
        if (activeTab == "pipelines") {
            return (
                <GitlabDeploymentActionablePipelinesTab
                    dashboardData={dashboardData}
                    kpiConfiguration={kpiConfiguration}
                    icon={faCodeCommit}
                />
            );
        } else if (activeTab == "deployments") {
            return (
                <GitlabDeploymentActionableDeployTab
                    dashboardData={dashboardData}
                    kpiConfiguration={kpiConfiguration}
                    icon={faCodeMerge}
                />
            );
        }
    };

    const handleTabClick = (tabSelection) => (e) => {
        e.preventDefault();
        setActiveTab(tabSelection);
    };

    const getTabContainer = () => {
        return (
            <CustomTabContainer>
                <CustomTab
                    activeTab={activeTab}
                    tabText={"Pipelines"}
                    handleTabClick={handleTabClick}
                    tabName={"pipelines"}
                    icon={faTable}
                />
                <CustomTab
                    activeTab={activeTab}
                    tabText={"Deployments"}
                    handleTabClick={handleTabClick}
                    tabName={"deployments"}
                    icon={faTable}
                />
            </CustomTabContainer>
        );
    };

    return (
        <FullScreenCenterOverlayContainer
            closePanel={closePanel}
            showPanel={true}
            titleText={"Gitlab Deployment Frequency Actionable Report"}
            showToasts={true}
            titleIcon={faTable}
            // isLoading={isLoading}
            linkTooltipText={"View Full Blueprint"}
        >
            <div className={"p-3"}>
                <TabPanelContainer currentView={getBody()} tabContainer={getTabContainer()} />
            </div>
        </FullScreenCenterOverlayContainer>
    );
}

GitlabDeploymentFreqActionableMasterTab.propTypes = {
    kpiConfiguration: PropTypes.object,
    dashboardData: PropTypes.object,
    highestMergesMetric: PropTypes.array,
};

export default GitlabDeploymentFreqActionableMasterTab;
