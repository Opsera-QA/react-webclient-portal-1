import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faArrowLeft, faUsers} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

function GroupManagementSubNavigationBar({activeTab}) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    switch (tabSelection) {
      case "accountSettings":
        history.push(`/settings`);
        return;
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
      <NavigationTab
        icon={faArrowLeft}
        tabName={"accountSettings"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Back to Account Settings"}
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
