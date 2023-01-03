mport React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import {
    faTable,
    faCodeMerge,
    faCodePullRequest,
    faCodePullRequestClosed,
    faUsers,
    faTag
} from "@fortawesome/pro-light-svg-icons";
import TabPanelContainer from "components/common/panels/general/TabPanelContainer";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import GitlabMergeRequestActionableRepoTab from "./open_tabs/GitlabOpenMergeActionableRepoTab";
import GitlabMergeRequestActionableTagsTab from "./open_tabs/GitlabOpenMergeActionableTagsTab";
import GitlabMergeRequestActionableReviewerTab from "./open_tabs/GitlabOpenMergeActionableReviewerTab";
import GitlabMergeActionableStats from "./GitlabOpenMergeActionableStats";

function GitlabOpenMergeActionableTabOverlay({ kpiConfiguration, dashboardData }) {
    const toastContext = useContext(DialogToastContext);
    const [activeTab, setActiveTab] = useState("repo");

    const closePanel = () => {
        toastContext.removeInlineMessage();
        toastContext.clearOverlayPanel();
    };

    const getBody = () => {
        if (activeTab == "repo") {
            return (
                <GitlabMergeRequestActionableRepoTab
                    dashboardData={dashboardData}
                    kpiConfiguration={kpiConfiguration}
                    icon={faCodePullRequest}
                />
            );
        } else if (activeTab == "tags") {
            return (
                <GitlabMergeRequestActionableTagsTab
                    dashboardData={dashboardData}
                    kpiConfiguration={kpiConfiguration}
                    icon={faCodePullRequestClosed}
                />
            );
        } else if (activeTab == "reviewer") {
            return (
                <GitlabMergeRequestActionableReviewerTab
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
                    tabText={"Repo"}
                    handleTabClick={handleTabClick}
                    tabName={"repo"}
                    icon={faCodePullRequest}
                />
                <CustomTab
                    activeTab={activeTab}
                    tabText={"Tags"}
                    handleTabClick={handleTabClick}
                    tabName={"tags"}
                    icon={faTag}
                />
                <CustomTab
                    activeTab={activeTab}
                    tabText={"Reviewer"}
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
            titleText={"Gitlab Merge Request Insights"}
            showToasts={true}
            titleIcon={faTable}
            // isLoading={isLoading}
            linkTooltipText={"View Full Blueprint"}
        >
            <div className={"p-3"}>
                <GitlabMergeActionableStats kpiConfiguration={kpiConfiguration} dashboardData={dashboardData} />
            </div>
            <div className={"p-3"}>
                <TabPanelContainer currentView={getBody()} tabContainer={getTabContainer()} />
            </div>
        </FullScreenCenterOverlayContainer>
    );
}

GitlabOpenMergeActionableTabOverlay.propTypes = {
    kpiConfiguration: PropTypes.object,
    dashboardData: PropTypes.object,
};

export default GitlabOpenMergeActionableTabOverlay;