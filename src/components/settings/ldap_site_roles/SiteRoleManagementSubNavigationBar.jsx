import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import { faChartNetwork, faCogs, faServer } from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

function SiteRoleManagementSubNavigationBar({activeTab}) {
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
