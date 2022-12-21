import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import { faTable, faCodeMerge, faCodePullRequest, faCodePullRequestClosed, faUsers} from "@fortawesome/pro-light-svg-icons";
import TabPanelContainer from "components/common/panels/general/TabPanelContainer";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import BoomiActionableInsightsCreateOverlay from "./BoomiActionableInsightsCreateOverlay";
import BoomiActionableInsightsDeployOverlay from "./BoomiActionableInsightsDeployOverlay";
import BoomiActionableInsightsMigrateOverlay from "./BoomiActionableInsightsMigrateOverlay";

function GitlabMergeRequestActionableTabOverlay({ kpiConfiguration, dashboardData }) {
    const toastContext = useContext(DialogToastContext);
    const [activeTab, setActiveTab] = useState("repo");

    const closePanel = () => {
        toastContext.removeInlineMessage();
        toastContext.clearOverlayPanel();
    };

    const getBody = () => {
        if (activeTab == "repo") {
            return (
                <BoomiActionableInsightsCreateOverlay
                    dashboardData={dashboardData}
                    kpiConfiguration={kpiConfiguration}
                    icon={faCodePullRequest}
                />
            );
        } else if (activeTab == "tags") {
            return (
                <BoomiActionableInsightsDeployOverlay
                    dashboardData={dashboardData}
                    kpiConfiguration={kpiConfiguration}
                    icon={faCodePullRequestClosed}
                />
            );
        } else if (activeTab == "reviewer") {
            return (
                <BoomiActionableInsightsMigrateOverlay
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
                    tabText={"CreatePackage"}
                    handleTabClick={handleTabClick}
                    tabName={"repo"}
                    icon={faCodePullRequest}
                />
                <CustomTab
                    activeTab={activeTab}
                    tabText={"Deploy Package"}
                    handleTabClick={handleTabClick}
                    tabName={"tags"}
                    icon={faCodeMerge}
                />
                <CustomTab
                    activeTab={activeTab}
                    tabText={"Migrate Package"}
                    handleTabClick={handleTabClick}
                    tabName={"reviewer"}
                    icon={faUsers}
                />
            </CustomTabContainer>
        );
    };

    return (
        <FullScreenCenterOverlayContainer
            closePanel={closePanel}
            showPanel={true}
            titleText={"Boomi Actionable Insights"}
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

GitlabMergeRequestActionableTabOverlay.propTypes = {
    kpiConfiguration: PropTypes.object,
    dashboardData: PropTypes.object,
};

export default GitlabMergeRequestActionableTabOverlay;