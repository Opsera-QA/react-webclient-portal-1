import React from "react";
import { useHistory } from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import { faUserChart } from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";
import AccountSettingsSubNavigationBarBase from "components/settings/AccountSettingsSubNavigationBarBase";

function AnalyticsDataEntryManagementSubNavigationBar({ activeTab }) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    if (activeTab === tabSelection) {
      return;
    }

    switch (tabSelection) {
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
      <AccountSettingsSubNavigationBarBase
        activeTab={activeTab}
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
