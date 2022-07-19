import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import { faTable, faCodeCommit, faBook, faCodeMerge } from "@fortawesome/pro-light-svg-icons";
import TabPanelContainer from "components/common/panels/general/TabPanelContainer";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import BoomiActionableInsightCreatePackageTab from "./tabs/BoomiActionableInsightCreatePackageTab";
import BoomiActionableInsightDeployPackageTab from "./tabs/BoomiActionableInsightDeployPackageTab";
import BoomiActionableInsightMigratePackageTab from "./tabs/BoomiActionableInsightMigratePackageTab";

function BoomiActionableInsightOverlay({ kpiConfiguration, dashboardData }) {
  const toastContext = useContext(DialogToastContext);
  const [activeTab, setActiveTab] = useState("createPackage");

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getBody = () => {
    if (activeTab == "createPackage") {
      return (
        <BoomiActionableInsightCreatePackageTab
          dashboardData={dashboardData}
          kpiConfiguration={kpiConfiguration}
          icon={faCodeCommit}
        />
      );
    } else if (activeTab == "deployPackage") {
      return (
        <BoomiActionableInsightDeployPackageTab
          dashboardData={dashboardData}
          kpiConfiguration={kpiConfiguration}
          icon={faCodeMerge}
        />
      );
    } else if (activeTab == "migratePackage") {
      return (
        <BoomiActionableInsightMigratePackageTab
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
          tabText={"Create Package"}
          handleTabClick={handleTabClick}
          tabName={"createPackage"}
          icon={faTable}
        />
        <CustomTab
          activeTab={activeTab}
          tabText={"Deploy Package"}
          handleTabClick={handleTabClick}
          tabName={"deployPackage"}
          icon={faTable}
        />
        <CustomTab
          activeTab={activeTab}
          tabText={"Migrate Package"}
          handleTabClick={handleTabClick}
          tabName={"migratePackage"}
          icon={faTable}
        />
      </CustomTabContainer>
    );
  };

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={"Boomi Report"}
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

BoomiActionableInsightOverlay.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  highestMergesMetric: PropTypes.array,
};

export default BoomiActionableInsightOverlay;
