import React, {useState} from "react";
import ProjectDataMappingManagement from "components/settings/data_mapping/projects/ProjectDataMappingManagement";
import UserDataMappingManagement from "components/settings/data_mapping/users/UserDataMappingManagement";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import {faProjectDiagram, faUser} from "@fortawesome/pro-light-svg-icons";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";

function DataMappingManagementTabView() {
  const [activeTab, setActiveTab] = useState("users");

  const handleTabClick = (tabSelection) => (e) => {
    e.preventDefault();
    setActiveTab(tabSelection);
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer styling="alternate-tabs">
        <CustomTab
          icon={faProjectDiagram}
          tabName={"projects"}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          tabText={"Project Tags"}
        />
        <CustomTab
          icon={faUser}
          tabName={"users"}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          tabText={"User Tags"}
        />
      </CustomTabContainer>
    );
  };

  const getDetailView = () => {
    if (activeTab) {
      switch (activeTab) {
        case "projects":
          return (
            <ProjectDataMappingManagement />
          );
        case "users":
          return (
            <UserDataMappingManagement />
          );
        default:
          return null;
      }
    }
  };

  return (
    <DetailTabPanelContainer
      tabContainer={getTabContainer()}
      detailView={getDetailView()}
    />
  );
}

DataMappingManagementTabView.propTypes = {};

export default DataMappingManagementTabView;
