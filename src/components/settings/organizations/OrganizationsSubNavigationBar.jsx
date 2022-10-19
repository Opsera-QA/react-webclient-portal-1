import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import { faChartNetwork, faCogs, faSitemap } from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

function OrganizationsSubNavigationBar({activeTab}) {
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
      case "organizations":
        history.push(`/settings/organizations`);
        return;
    }
  };

  const getActiveViewerTab = () => {
    switch (activeTab) {
      case "organizationViewer":
        return (
          <NavigationTab
            icon={faSitemap}
            tabName={"organizationViewer"}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
            tabText={"Organization Viewer"}
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
        icon={faSitemap}
        tabName={"organizations"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Organizations"}
      />
      {getActiveViewerTab()}
    </NavigationTabContainer>
  );
}

OrganizationsSubNavigationBar.propTypes = {
  activeTab: PropTypes.string,
};

export default OrganizationsSubNavigationBar;
