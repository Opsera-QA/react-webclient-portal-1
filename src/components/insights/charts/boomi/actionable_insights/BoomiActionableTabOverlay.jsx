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

function BoomiActionableTabOverlay({ kpiConfiguration, dashboardData }) {
    const toastContext = useContext(DialogToastContext);
    const [activeTab, setActiveTab] = useState("create");

    const closePanel = () => {
        toastContext.removeInlineMessage();
        toastContext.clearOverlayPanel();
    };

    const getBody = () => {
        if (activeTab == "create") {
            return (
                <BoomiActionableInsightsCreateOverlay
                    dashboardData={dashboardData}
                    kpiConfiguration={kpiConfiguration}
                    icon={faCodePullRequest}
                />
            );
        } else if (activeTab == "deploy") {
            return (
                <BoomiActionableInsightsDeployOverlay
                    dashboardData={dashboardData}
                    kpiConfiguration={kpiConfiguration}
                    icon={faCodePullRequestClosed}
                />
            );
        } else if (activeTab == "migrate") {
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
                    tabName={"create"}
                    icon={faCodePullRequest}
                />
                <CustomTab
                    activeTab={activeTab}
                    tabText={"Deploy Package"}
                    handleTabClick={handleTabClick}
                    tabName={"deploy"}
                    icon={faCodeMerge}
                />
                <CustomTab
                    activeTab={activeTab}
                    tabText={"Migrate Package"}
                    handleTabClick={handleTabClick}
                    tabName={"migrate"}
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

BoomiActionableTabOverlay.propTypes = {
    kpiConfiguration: PropTypes.object,
    dashboardData: PropTypes.object,
};

export default BoomiActionableTabOverlay;