import React, {useState} from "react";
import ProjectDataMappingManagement from "components/settings/data_mapping/projects/ProjectDataMappingManagement";
import UserDataMappingManagement from "components/settings/data_mapping/users/UserDataMappingManagement";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import {faProjectDiagram, faUser} from "@fortawesome/pro-light-svg-icons";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import PipelineDataMappingManagement from "components/settings/data_mapping/pipelines/PipelineDataMappingManagement";

export default function DataMappingManagementTabView() {
  const [activeTab, setActiveTab] = useState("projects");

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
        {/*<CustomTab*/}
        {/*  icon={faDraftingCompass}*/}
        {/*  tabName={"pipeline"}*/}
        {/*  handleTabClick={handleTabClick}*/}
        {/*  activeTab={activeTab}*/}
        {/*  tabText={"Pipeline Data Mapping"}*/}
        {/*/>*/}
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
      case "pipeline":
        return (
          <PipelineDataMappingManagement />
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
