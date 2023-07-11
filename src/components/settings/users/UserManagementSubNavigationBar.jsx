import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faUser, faUserHardHat} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";
import AccountSettingsSubNavigationBarBase from "components/settings/AccountSettingsSubNavigationBarBase";

function UserManagementSubNavigationBar({activeTab}) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    if (tabSelection === activeTab) {
      return;
    }

    switch (tabSelection) {
      case "users":
        history.push(`/settings/user-management`);
        return;
    }
  };

  return (
    <NavigationTabContainer>
      <AccountSettingsSubNavigationBarBase
        activeTab={activeTab}
      />
      <NavigationTab
        icon={faUser}
        tabName={"users"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Users"}
      />
      <NavigationTab
        icon={faUser}
        tabName={"userViewer"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"User Viewer"}
        visible={activeTab === "userViewer"}
      />
      <NavigationTab
        icon={faUserHardHat}
        tabName={"pendingUserViewer"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Pending User Viewer"}
        visible={activeTab === "pendingUserViewer"}
      />
    </NavigationTabContainer>
  );
}

UserManagementSubNavigationBar.propTypes = {
  activeTab: PropTypes.string,
};

export default UserManagementSubNavigationBar;
