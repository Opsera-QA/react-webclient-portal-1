import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {
  faEnvelope,
  faFileCode,
  faHandshake,
  faProjectDiagram,
  faServer, faTable,
  faTools
} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

function NotificationSubNavigationBar({activeTab}) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    switch (tabSelection) {
      case "notifications":
        history.push(`/notifications`);
        return;
      case "activity":
        history.push(`/notifications/activity`);
        return;
    }
  };

  const getActiveViewerTab = () => {
    switch (activeTab) {
      case "notificationViewer":
        return (
          <NavigationTab
            icon={faTools}
            tabName={"notificationViewer"}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
            tabText={"Notification Policy Viewer"}
          />
        );
      default:
        return null;
    }
  };

  return (
    <NavigationTabContainer>
      <NavigationTab
        tabName={"notifications"}
        icon={faEnvelope}
        tabText={"Notification Policies"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
      />
      <NavigationTab
        tabName={"activity"}
        icon={faTable}
        tabText={"Activity Logs"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
      />
      {getActiveViewerTab()}
    </NavigationTabContainer>
  );
}

NotificationSubNavigationBar.propTypes = {
  activeTab: PropTypes.string,
};

export default NotificationSubNavigationBar;
