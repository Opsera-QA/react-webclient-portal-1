import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faArrowLeft, faCogs} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

export default function PlatformSystemParameterManagementSubNavigationBar({activeTab}) {
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
      case "platformSystemParameterViewer":
        return (
          <NavigationTab
            icon={faCogs}
            tabName={"platformSystemParameterViewer"}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
            tabText={"Platform System Parameter Viewer"}
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
        icon={faCogs}
        tabName={"platformSystemParameterManagement"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Platform System Parameter Manager"}
      />
      {getActiveViewerTab()}
    </NavigationTabContainer>
  );
}

PlatformSystemParameterManagementSubNavigationBar.propTypes = {
  activeTab: PropTypes.string,
};
