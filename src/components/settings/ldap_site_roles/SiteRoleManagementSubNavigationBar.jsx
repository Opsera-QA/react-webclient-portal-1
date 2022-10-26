import React from "react";
import { useHistory } from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import { faServer } from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";
import AccountSettingsSubNavigationBarBase from "components/settings/AccountSettingsSubNavigationBarBase";

function SiteRoleManagementSubNavigationBar({ activeTab }) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    if (tabSelection === activeTab) {
      return;
    }

    switch (tabSelection) {
      case "siteRoles":
        history.push(`/settings/site-roles`);
        return;
    }
  };

  const getActiveViewerTab = () => {
    switch (activeTab) {
      case "siteRoleViewer":
        return (
          <NavigationTab
            icon={faServer}
            tabName={"siteRoleViewer"}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
            tabText={"Site Role Viewer"}
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
        icon={faServer}
        tabName={"siteRoles"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Site Roles"}
      />
      {getActiveViewerTab()}
    </NavigationTabContainer>
  );
}

SiteRoleManagementSubNavigationBar.propTypes = {
  activeTab: PropTypes.string,
};

export default SiteRoleManagementSubNavigationBar;
