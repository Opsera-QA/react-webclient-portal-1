import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {
  faChartNetwork,
  faClipboardUser,
  faCogs,
} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

export default function FreeTrialUserActivityReportSubNavigationBar({activeTab}) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    if (tabSelection === activeTab) {
      return;
    }

    switch (tabSelection) {
      case "accountSettings":
        history.push(`/settings`);
        return;
      case "freeTrialUserActivityReport":
        history.push(`/settings/trial/user/activity-report`);
        return;
    }
  };

  const getActiveViewerTab = () => {
    switch (activeTab) {
      case "userActivityViewer":
        return (
          <NavigationTab
            icon={faClipboardUser}
            tabName={"userActivityViewer"}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
            tabText={"User Activity Viewer"}
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
        icon={faClipboardUser}
        tabName={"freeTrialUserActivityReport"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Free Trial Activity Report"}
      />
      {getActiveViewerTab()}
    </NavigationTabContainer>
  );
}

FreeTrialUserActivityReportSubNavigationBar.propTypes = {
  activeTab: PropTypes.string,
};