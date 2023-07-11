import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {
  faDraftingCompass,
  faProjectDiagram,
  faUserTag,
} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";
import AccountSettingsSubNavigationBarBase from "components/settings/AccountSettingsSubNavigationBarBase";

function DataMappingManagementSubNavigationBar({activeTab}) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    if (activeTab === tabSelection) {
      return;
    }

    switch (tabSelection) {
      case "dataMappingManagement":
        history.push(`/settings/data_mapping`);
        return;
    }
  };

  const getActiveViewerTab = () => {
    switch (activeTab) {
      case "projectTagViewer":
        return (
          <NavigationTab
            icon={faProjectDiagram}
            tabName={"projectTagViewer"}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
            tabText={"Project Data Mapping Viewer"}
          />
        );
      case "userTagViewer":
        return (
          <NavigationTab
            icon={faUserTag}
            tabName={"userTagViewer"}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
            tabText={"User Data Mapping Viewer"}
          />
        );
      case "pipelineTagViewer":
        return (
          <NavigationTab
            icon={faDraftingCompass}
            tabName={"pipelineTagViewer"}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
            tabText={"Pipeline Data Mapping Viewer"}
          />
        );
      default:
        return null;
    }
  };

  return (
    <NavigationTabContainer>
      <AccountSettingsSubNavigationBarBase
        activeTab={activeTab}
      />
      <NavigationTab
        icon={faProjectDiagram}
        tabName={"dataMappingManagement"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Data Mapping Management"}
      />
      {getActiveViewerTab()}
    </NavigationTabContainer>
  );
}

DataMappingManagementSubNavigationBar.propTypes = {
  activeTab: PropTypes.string,
};

export default DataMappingManagementSubNavigationBar;
