import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faArrowLeft, faServer} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

function SiteRoleManagementSubNavigationBar({activeTab}) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    switch (tabSelection) {
      case "accountSettings":
        history.push(`/settings`);
        return;
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
            tabText={"Site Roles Detail View"}
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
        icon={faServer}
        tabName={"siteRoles"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Site Roles & Departments"}
      />
      {getActiveViewerTab()}
    </NavigationTabContainer>
  );
}

SiteRoleManagementSubNavigationBar.propTypes = {
  activeTab: PropTypes.string,
};

export default SiteRoleManagementSubNavigationBar;
