import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { faDiagramSuccessor, faListCheck, faChartNetwork} from "@fortawesome/pro-light-svg-icons";
import TabPanelContainer from "components/common/panels/general/TabPanelContainer";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import ConnectedAssetsRepositoriesPipelinesTab from "./pipelines/ConnectedAssetsRepositoriesPipelinesTab";
import ConnectedAssetsRepositoriesTasksTab from "./tasks/ConnectedAssetsRepositoriesTasksTab";
import ConnectedAssetsRepositoriesInsightsTab from "./insights/ConnectedAssetsRepositoriesInsightsTab";

function ConnectedAssetsRepositoryTabContainer({ dashboardData }) {
  const [activeTab, setActiveTab] = useState("pipelines");

  const getBody = () => {
    if (activeTab == "pipelines") {
      return (
        <ConnectedAssetsRepositoriesPipelinesTab
          dashboardData={dashboardData}
          icon={faDiagramSuccessor}
        />
      );
    } else if (activeTab == "tasks") {
      return (
        <ConnectedAssetsRepositoriesTasksTab
          dashboardData={dashboardData}
          icon={faListCheck}
        />
      );
    } else if (activeTab == "insights") {
      return (
        <ConnectedAssetsRepositoriesInsightsTab
          dashboardData={dashboardData}
          icon={faChartNetwork}
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
        <CustomTab
          activeTab={activeTab}
          tabText={"Insights"}
          handleTabClick={handleTabClick}
          tabName={"insights"}
          icon={faChartNetwork}
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

ConnectedAssetsRepositoryTabContainer.propTypes = {
  dashboardData: PropTypes.object,
};

export default ConnectedAssetsRepositoryTabContainer;
