import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import { faArrowLeft, faFolderCog } from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

export default function PlatformSettingsManagementSubNavigationBar({activeTab}) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    switch (tabSelection) {
      case "adminTools":
        history.push(`/admin`);
        return;
      case "platformSystemParameterManagement":
        history.push(`/admin/platform/system-parameters`);
        return;
    }
  };

  const getActiveViewerTab = () => {
    switch (activeTab) {
      case "platformSettingsViewer":
        return (
          <NavigationTab
            icon={faFolderCog}
            tabName={"platformSettingsViewer"}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
            tabText={"Platform Settings Viewer"}
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
        icon={faFolderCog}
        tabName={"platformSettingsManagement"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Platform Settings Manager"}
      />
      {getActiveViewerTab()}
    </NavigationTabContainer>
  );
}

PlatformSettingsManagementSubNavigationBar.propTypes = {
  activeTab: PropTypes.string,
};
