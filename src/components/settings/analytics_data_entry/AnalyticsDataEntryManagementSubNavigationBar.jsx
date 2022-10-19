import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import { faChartNetwork, faCogs, faUserChart } from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

function AnalyticsDataEntryManagementSubNavigationBar({activeTab}) {
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
      case "analyticsDataEntries":
        history.push(`/settings/analytics-data-entries`);
        return;
    }
  };

  const getActiveViewerTab = () => {
    switch (activeTab) {
      case "analyticsDataEntryViewer":
        return (
          <NavigationTab
            icon={faUserChart}
            tabName={"analyticsDataEntryViewer"}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
            tabText={"Analytics Data Entry Viewer"}
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
        icon={faUserChart}
        tabName={"analyticsDataEntries"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Analytics Data Entries"}
      />
      {getActiveViewerTab()}
    </NavigationTabContainer>
  );
}

AnalyticsDataEntryManagementSubNavigationBar.propTypes = {
  activeTab: PropTypes.string,
};

export default AnalyticsDataEntryManagementSubNavigationBar;
