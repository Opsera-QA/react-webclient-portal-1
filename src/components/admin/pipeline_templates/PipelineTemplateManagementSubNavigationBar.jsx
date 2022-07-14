import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faArrowLeft, faStream} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

function PipelineTemplateManagementSubNavigationBar({activeTab}) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    switch (tabSelection) {
      case "adminTools":
        history.push(`/admin`);
        return;
      case "pipelineTemplateManagement":
        history.push(`/admin/templates`);
        return;
    }
  };

  const getActiveViewerTab = () => {
    switch (activeTab) {
      case "pipelineTemplateViewer":
        return (
          <NavigationTab
            icon={faStream}
            tabName={"pipelineTemplateViewer"}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
            tabText={"Pipeline Template Viewer"}
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
        icon={faStream}
        tabName={"pipelineTemplateManagement"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Pipeline Template Manager"}
      />
      {getActiveViewerTab()}
    </NavigationTabContainer>
  );
}

PipelineTemplateManagementSubNavigationBar.propTypes = {
  activeTab: PropTypes.string,
};

export default PipelineTemplateManagementSubNavigationBar;
