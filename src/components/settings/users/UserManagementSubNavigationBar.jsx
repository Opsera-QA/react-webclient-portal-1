import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import { faArrowLeft, faChartNetwork, faCogs, faUser } from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

function UserManagementSubNavigationBar({activeTab}) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    switch (tabSelection) {
      case "accountSettings":
        history.push(`/settings`);
        return;
      case "insightsSettings":
        history.push(`/settings/insights`);
        return;
      case "users":
        history.push(`/settings/user-management`);
        return;
    }
  };

  const getActiveViewerTab = () => {
    switch (activeTab) {
      case "userViewer":
        return (
          <NavigationTab
            icon={faUser}
            tabName={"userViewer"}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
            tabText={"User Viewer"}
          />
        );
      default:
        return null;
    }
  };

  return (
    <NavigationTabContainer>
      <NavigationTab
        icon={faCogs}
        tabName={"accountSettings"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Account Settings"}
      />
      <NavigationTab
        icon={faChartNetwork}
        tabName={"insightsSettings"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Insights Settings"}
      />
      <NavigationTab
        icon={faUser}
        tabName={"users"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Users"}
      />
      {getActiveViewerTab()}
    </NavigationTabContainer>
  );
}

UserManagementSubNavigationBar.propTypes = {
  activeTab: PropTypes.string,
};

export default UserManagementSubNavigationBar;
