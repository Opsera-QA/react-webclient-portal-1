import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import { faChartNetwork, faCogs, faTags } from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

export default function LogsExportOptionsSubNavigationBar({activeTab}) {
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
      case "logsExportOptions":
        history.push(`/logs-export-management`);
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
        icon={faTags}
        tabName={"logsExportOptions"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Logs Export Options"}
      />
    </NavigationTabContainer>
  );
}

LogsExportOptionsSubNavigationBar.propTypes = {
  activeTab: PropTypes.string,
};
