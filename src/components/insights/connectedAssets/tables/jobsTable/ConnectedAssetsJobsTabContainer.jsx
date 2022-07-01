import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { faDiagramSuccessor, faListCheck } from "@fortawesome/pro-light-svg-icons";
import TabPanelContainer from "components/common/panels/general/TabPanelContainer";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import ConnectedAssetsJobsPipelinesTable from "./ConnectedAssetsJobsPipelinesTable";
import ConnectedAssetsJobsTasksTable from "./ConnectedAssetsJobsTasksTable";

function ConnectedAssetsJobsTabContainer({ dashboardData }) {
  const [activeTab, setActiveTab] = useState("pipelines");

  const getBody = () => {
    if (activeTab == "pipelines") {
      return (
        <ConnectedAssetsJobsPipelinesTable
          dashboardData={dashboardData}
          icon={faDiagramSuccessor}
        />
      );
    } else if (activeTab == "tasks") {
      return (
        <ConnectedAssetsJobsTasksTable
          dashboardData={dashboardData}
          icon={faListCheck}
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
        <CustomTab
          activeTab={activeTab}
          tabText={"Tasks"}
          handleTabClick={handleTabClick}
          tabName={"tasks"}
          icon={faListCheck}
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

ConnectedAssetsJobsTabContainer.propTypes = {
  dashboardData: PropTypes.object,
};

export default ConnectedAssetsJobsTabContainer;
