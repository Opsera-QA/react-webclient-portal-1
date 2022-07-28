import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { faDiagramSuccessor } from "@fortawesome/pro-light-svg-icons";
import TabPanelContainer from "components/common/panels/general/TabPanelContainer";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import ConnectedAssetsRepositoriesPipelinesTab from "./pipelines/ConnectedAssetsPackagesPipelinesTab";

function ConnectedAssetsPackagesTabContainer({ dashboardData }) {
  const [activeTab, setActiveTab] = useState("pipelines");

  const getBody = () => {
    if (activeTab == "pipelines") {
      return (
        <ConnectedAssetsRepositoriesPipelinesTab
          dashboardData={dashboardData}
          icon={faDiagramSuccessor}
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
          icon={faDiagramSuccessor}
        />
      </CustomTabContainer>
    );
  };

  return (
    <div className={"p-3"}>
      <TabPanelContainer currentView={getBody()} tabContainer={getTabContainer()} />
    </div>
  );
}

ConnectedAssetsPackagesTabContainer.propTypes = {
  dashboardData: PropTypes.object,
};

export default ConnectedAssetsPackagesTabContainer;
