import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faArrowLeft, faStream} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

export default function TaskTemplateManagementSubNavigationBar({activeTab}) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    switch (tabSelection) {
      case "adminTools":
        history.push(`/admin`);
        return;
      case "taskTemplateManagement":
        history.push(`/admin/templates/tasks`);
        return;
    }
  };

  const getActiveViewerTab = () => {
    switch (activeTab) {
      case "taskTemplateViewer":
        return (
          <NavigationTab
            icon={faStream}
            tabName={"taskTemplateViewer"}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
            tabText={"Task Template Viewer"}
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
        tabName={"taskTemplateManagement"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Task Template Manager"}
      />
      {getActiveViewerTab()}
    </NavigationTabContainer>
  );
}

TaskTemplateManagementSubNavigationBar.propTypes = {
  activeTab: PropTypes.string,
};
