import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import { faTable, faCodeCommit, faBook, faCodeMerge } from "@fortawesome/pro-light-svg-icons";
import TabPanelContainer from "components/common/panels/general/TabPanelContainer";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import GitlabDeploymentFreqActionablePipelinesTab from "./GitlabDeploymentFreqActionablePipelinesTab";
import GitlabDeploymentFreqActionableDeployTab from "./GitlabDeploymentFreqActionableDeployTab";

function MTTRActionableInsightOverlay({ kpiConfiguration, dashboardData, start, end, range, type }) {
  const toastContext = useContext(DialogToastContext);
  const [activeTab, setActiveTab] = useState(type);

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getBody = () => {
    if (activeTab == "Pipeline") {
      return (
        <GitlabDeploymentFreqActionablePipelinesTab
          dashboardData={dashboardData}
          kpiConfiguration={kpiConfiguration}
          start={start}
          end={end}
          range={range}
          icon={faCodeCommit}
        />
      );
    } else if (activeTab == "Deployment") {
      return (
        <GitlabDeploymentFreqActionableDeployTab
          dashboardData={dashboardData}
          kpiConfiguration={kpiConfiguration}
          start={start}
          end={end}
          range={range}
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
          tabName={"Pipeline"}
          icon={faTable}
        />
        <CustomTab
          activeTab={activeTab}
          tabText={"Deployments"}
          handleTabClick={handleTabClick}
          tabName={"Deployment"}
          icon={faTable}
        />
      </CustomTabContainer>
    );
  };

  return (
    <FullScreenCenterOverlayContainer
        closePanel={closePanel}
        showPanel={true}
        titleText={"Gitlab Deployments Actionable Report"}
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

MTTRActionableInsightOverlay.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  start: PropTypes.string,
  end: PropTypes.string,
  range: PropTypes.string,
  type: PropTypes.string,
};

export default MTTRActionableInsightOverlay;
