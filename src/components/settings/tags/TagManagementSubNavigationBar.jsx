import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import { faChartNetwork, faCogs, faTags } from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

function TagManagementSubNavigationBar({activeTab}) {
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
      case "tags":
        history.push(`/settings/tags`);
        return;
    }
  };

  const getActiveViewerTab = () => {
    switch (activeTab) {
      case "tagViewer":
        return (
          <NavigationTab
            icon={faTags}
            tabName={"tagViewer"}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
            tabText={"Tag Viewer"}
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
        icon={faTags}
        tabName={"tags"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Tags"}
      />
      {getActiveViewerTab()}
    </NavigationTabContainer>
  );
}

TagManagementSubNavigationBar.propTypes = {
  activeTab: PropTypes.string,
};

export default TagManagementSubNavigationBar;
