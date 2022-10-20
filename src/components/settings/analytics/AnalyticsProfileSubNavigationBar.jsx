import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import { faChartNetwork, faCogs } from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

function AnalyticsProfileSubNavigationBar({activeTab}) {
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
      case "analyticsProfile":
        history.push(`/settings/analytics-profile`);
        return;
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
