import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import { faTable, faCodeCommit, faBook, faCodeMerge } from "@fortawesome/pro-light-svg-icons";
import TabPanelContainer from "components/common/panels/general/TabPanelContainer";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import MTTRActionableInsightsMainSevOneTab from "./tabs/MTTRActionableInsightsMainSevOneTab";
import MTTRActionableInsightsMainSevTwoTab from "./tabs/MTTRActionableInsightMainSevTwoTab";
import MTTRActionableInsightMainSevThreeTab from "./tabs/MTTRActionableInsightMainSevThreeTab";
import MTTRActionableInsightMainSevFourTab from "./tabs/MTTRActionableInsightMainSevFourTab";
import MTTRActionableInsightMainSevFiveTab from "./tabs/MTTRActionableInsightMainSevFiveTab";

function MTTRActionableInsightOverlay({ kpiConfiguration, dashboardData }) {
  const toastContext = useContext(DialogToastContext);
  const [activeTab, setActiveTab] = useState("one");

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getBody = () => {
    if (activeTab == "one") {
      return (
        <MTTRActionableInsightsMainSevOneTab
          dashboardData={dashboardData}
          kpiConfiguration={kpiConfiguration}
          icon={faCodeCommit}
        />
      );
    } else if (activeTab == "two") {
      return (
        <MTTRActionableInsightsMainSevTwoTab
          dashboardData={dashboardData}
          kpiConfiguration={kpiConfiguration}
          icon={faCodeMerge}
        />
      );
    } else if (activeTab == "three") {
      return (
        <MTTRActionableInsightMainSevThreeTab
          dashboardData={dashboardData}
          kpiConfiguration={kpiConfiguration}
          icon={faTable}
        />
      );
    } else if (activeTab == "four") {
      return (
        <MTTRActionableInsightMainSevFourTab
          dashboardData={dashboardData}
          kpiConfiguration={kpiConfiguration}
          icon={faTable}
        />
      );
    } else if (activeTab == "five") {
      return (
        <MTTRActionableInsightMainSevFiveTab
          dashboardData={dashboardData}
          kpiConfiguration={kpiConfiguration}
          icon={faTable}
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
          tabText={"Severity 1"}
          handleTabClick={handleTabClick}
          tabName={"one"}
          icon={faTable}
        />
        <CustomTab
          activeTab={activeTab}
          tabText={"Severity 2"}
          handleTabClick={handleTabClick}
          tabName={"two"}
          icon={faTable}
        />
        <CustomTab
          activeTab={activeTab}
          tabText={"Severity 3"}
          handleTabClick={handleTabClick}
          tabName={"three"}
          icon={faTable}
        />
        <CustomTab
          activeTab={activeTab}
          tabText={"Severity 4"}
          handleTabClick={handleTabClick}
          tabName={"four"}
          icon={faTable}
        />
        <CustomTab
          activeTab={activeTab}
          tabText={"Severity 5"}
          handleTabClick={handleTabClick}
          tabName={"five"}
          icon={faTable}
        />
      </CustomTabContainer>
    );
  };

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={"Service Now MTTR Issues by Severity Report"}
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
  highestMergesMetric: PropTypes.array,
};

export default MTTRActionableInsightOverlay;
