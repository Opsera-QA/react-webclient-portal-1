import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faArrowLeft, faUserCircle} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

function RegisteredUsersManagementSubNavigationBar({activeTab}) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    switch (tabSelection) {
      case "adminTools":
        history.push(`/admin`);
        return;
      case "registeredUsersManagement":
        history.push(`/admin/registered-users`);
        return;
    }
  };

  const getActiveViewerTab = () => {
    switch (activeTab) {
      case "registeredUserViewer":
        return (
          <NavigationTab
            icon={faUserCircle}
            tabName={"registeredUserViewer"}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
            tabText={"Registered User Viewer"}
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
        icon={faUserCircle}
        tabName={"registeredUsersManagement"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Registered Users Management"}
      />
      {getActiveViewerTab()}
    </NavigationTabContainer>
  );
}

RegisteredUsersManagementSubNavigationBar.propTypes = {
  activeTab: PropTypes.string,
};

export default RegisteredUsersManagementSubNavigationBar;
