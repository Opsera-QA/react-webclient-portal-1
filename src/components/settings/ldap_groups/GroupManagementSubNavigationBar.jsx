import React from "react";
import { useHistory } from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import { faUsers } from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";
import AccountSettingsSubNavigationBarBase from "components/settings/AccountSettingsSubNavigationBarBase";

function GroupManagementSubNavigationBar({ activeTab }) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    if (tabSelection === activeTab) {
      return;
    }

    switch (tabSelection) {
      case "groups":
        history.push(`/settings/groups`);
        return;
    }
  };

  const getActiveViewerTab = () => {
    switch (activeTab) {
      case "groupViewer":
        return (
          <NavigationTab
            icon={faUsers}
            tabName={activeTab}
            handleTabClick={handleTabClick}
            activeTab={"groupViewer"}
            tabText={"Group Viewer"}
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
        icon={faUsers}
        tabName={"groups"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Groups"}
      />
      {getActiveViewerTab()}
    </NavigationTabContainer>
  );
}

GroupManagementSubNavigationBar.propTypes = {
  activeTab: PropTypes.string,
};

export default GroupManagementSubNavigationBar;
