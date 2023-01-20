import React from "react";
import { useHistory } from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import { faChartNetwork, faCogs } from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";
import AccountSettingsSubNavigationBarBase from "components/settings/AccountSettingsSubNavigationBarBase";

function AnalyticsProfileSubNavigationBar({ activeTab }) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    if (activeTab === tabSelection) {
      return;
    }

    switch (tabSelection) {
      case "analyticsProfile":
        history.push(`/settings/analytics-profile`);
        return;
    }
  };

  return (
    <NavigationTabContainer>
      <AccountSettingsSubNavigationBarBase
        activeTab={activeTab}
      />
      <NavigationTab
        icon={faChartNetwork}
        tabName={"analyticsProfile"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Analytics Profile"}
      />
    </NavigationTabContainer>
  );
}

AnalyticsProfileSubNavigationBar.propTypes = {
  activeTab: PropTypes.string,
};

export default AnalyticsProfileSubNavigationBar;
