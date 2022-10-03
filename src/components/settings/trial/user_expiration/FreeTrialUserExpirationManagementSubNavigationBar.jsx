import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {
  faArrowLeft,
  faHourglassClock,
  faUserAltSlash,
  faUserCheck,
  faUserShield,
} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

function FreeTrialUserExpirationManagementSubNavigationBar({activeTab}) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    switch (tabSelection) {
      case "accountSettings":
        history.push(`/settings`);
        return;
      case "freeTrialUserExpirationManagement":
        history.push(`/settings/trial/user-expiration-management`);
        return;
    }
  };

  const getActiveViewerTab = () => {
    switch (activeTab) {
      case "userRevocation":
        return (
          <NavigationTab
            icon={faUserAltSlash}
            tabName={"userRevocation"}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
            tabText={"Revoke User Screen"}
          />
        );
      case "userExtension":
        return (
          <NavigationTab
            icon={faHourglassClock}
            tabName={"userExtension"}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
            tabText={"Extend User Screen"}
          />
        );
      case "userReinstatement":
        return (
          <NavigationTab
            icon={faUserCheck}
            tabName={"userReinstatement"}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
            tabText={"Reinstate User Screen"}
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
        icon={faUserShield}
        tabName={"freeTrialUserExpirationManagement"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Free Trial User Expiration Management"}
      />
      {getActiveViewerTab()}
    </NavigationTabContainer>
  );
}

FreeTrialUserExpirationManagementSubNavigationBar.propTypes = {
  activeTab: PropTypes.string,
};

export default FreeTrialUserExpirationManagementSubNavigationBar;
