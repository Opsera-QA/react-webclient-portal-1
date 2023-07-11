import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faArrowLeft, faFileArchive} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

function PipelineStorageManagementSubNavigationBar({activeTab}) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    switch (tabSelection) {
      case "adminTools":
        history.push(`/admin`);
        return;
      case "pipelineStorageManagement":
        history.push(`/admin/pipeline-storage`);
        return;
    }
  };

  const getActiveViewerTab = () => {
    switch (activeTab) {
      case "pipelineStorageViewer":
        return (
          <NavigationTab
            icon={faFileArchive}
            tabName={"pipelineStorageViewer"}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
            tabText={"Pipeline Storage Viewer"}
          />
        );
      default:
        return null;
    }
  };

  return (
    <NavigationTabContainer>
      <NavigationTab
        icon={faArrowLeft}
        tabName={"adminTools"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Back to Admin Tools"}
      />
      <NavigationTab
        icon={faFileArchive}
        tabName={"pipelineStorageManagement"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Pipeline Storage Management"}
      />
      {getActiveViewerTab()}
    </NavigationTabContainer>
  );
}

PipelineStorageManagementSubNavigationBar.propTypes = {
  activeTab: PropTypes.string,
};

export default PipelineStorageManagementSubNavigationBar;
