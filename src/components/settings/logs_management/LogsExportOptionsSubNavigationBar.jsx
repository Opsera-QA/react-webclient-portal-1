import React from "react";
import { useHistory } from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import { faChartNetwork, faCogs, faTags } from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";
import AccountSettingsSubNavigationBarBase from "components/settings/AccountSettingsSubNavigationBarBase";

export default function LogsExportOptionsSubNavigationBar({ activeTab }) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    if (tabSelection === activeTab) {
      return;
    }

    switch (tabSelection) {
      case "logsExportOptions":
        history.push(`/logs-export-management`);
        return;
    }
  };

  return (
    <NavigationTabContainer>
      <AccountSettingsSubNavigationBarBase
        activeTab={activeTab}
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
