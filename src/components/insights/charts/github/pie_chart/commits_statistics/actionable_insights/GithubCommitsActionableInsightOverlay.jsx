import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import { faTable, faCodeMerge, faCodePullRequest, faCodePullRequestClosed} from "@fortawesome/pro-light-svg-icons";
import TabPanelContainer from "components/common/panels/general/TabPanelContainer";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import GithubCommitsActionableInsightOpenTab from "./GithubCommitsActionableInsightOpenTab";
import GithubCommitsActionableInsightClosedTab from "./GithubCommitsActionableInsightClosedTab";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import GithubCommitsActionableInsightMergedTab from "./GithubCommitsActionableInsightMergedTab";
import GithubCommitsActionableInsightContributorsTab from "./GithubCommitsActionableInsightContributorsTab";

function GithubCommitsActionableInsightOverlay({ kpiConfiguration, dashboardData, highestMergesMetric }) {
  const toastContext = useContext(DialogToastContext);
  const [activeTab, setActiveTab] = useState("opened");

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getBody = () => {
    if (activeTab == "opened") {
      return (
        <GithubCommitsActionableInsightOpenTab
          highestMergesMetric={highestMergesMetric}
          dashboardData={dashboardData}
          kpiConfiguration={kpiConfiguration}
          icon={faCodePullRequest}
        />
      );
    } else if (activeTab == "closed") {
      return (
        <GithubCommitsActionableInsightClosedTab
          highestMergesMetric={highestMergesMetric}
          dashboardData={dashboardData}
          kpiConfiguration={kpiConfiguration}
          icon={faCodePullRequestClosed}
        />
      );
    } else if (activeTab == "merged") {
      return (
        <GithubCommitsActionableInsightMergedTab
          highestMergesMetric={highestMergesMetric}
          dashboardData={dashboardData}
          kpiConfiguration={kpiConfiguration}
          icon={faCodeMerge}
        />
      );
    } else if (activeTab == "contributors") {
      return (
        <GithubCommitsActionableInsightContributorsTab
          highestMergesMetric={highestMergesMetric}
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
          tabText={"Open Pull Requests"}
          handleTabClick={handleTabClick}
          tabName={"opened"}
          icon={faCodePullRequest}
        />
        <CustomTab
          activeTab={activeTab}
          tabText={"Closed Pull Requests"}
          handleTabClick={handleTabClick}
          tabName={"closed"}
          icon={faCodePullRequestClosed}
        />
        <CustomTab
          activeTab={activeTab}
          tabText={"Merged Pull Requests"}
          handleTabClick={handleTabClick}
          tabName={"merged"}
          icon={faCodeMerge}
        />
        <CustomTab
          activeTab={activeTab}
          tabText={"Contributors"}
          handleTabClick={handleTabClick}
          tabName={"contributors"}
          icon={faCodeMerge}
        />
      </CustomTabContainer>
    );
  };

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={"Github Total Commits"}
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

GithubCommitsActionableInsightOverlay.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  highestMergesMetric: PropTypes.array,
};

export default GithubCommitsActionableInsightOverlay;
