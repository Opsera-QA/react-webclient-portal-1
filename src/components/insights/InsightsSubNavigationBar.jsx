import React, {useContext} from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {
  faChartArea,
  faChartNetwork, faCircle,
  faRadar,
  faUserChart
} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";

function InsightsSubNavigationBar({currentTab}) {
  const { featureFlagHideItemInProd } = useContext(AuthContext);
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    switch (tabSelection) {
      /*case "analytics":
        history.push(`/insights/analytics`);
        return;*/
      case "marketplace":
        history.push(`/insights/marketplace`);
        return;
      case "dashboards":
        history.push(`/insights/`);
        return;
      case "synopsis":
        history.push(`/insights/synopsis`);
        return;
      case "release360":
        history.push(`/insights/release360`);
        return;
    }
  };

  const getActiveViewerTab = () => {
    switch (currentTab) {
      case "dashboardViewer":
        return (
          <NavigationTab
            icon={faUserChart}
            tabName={"dashboardViewer"}
            handleTabClick={handleTabClick}
            activeTab={"dashboardViewer"}
            tabText={"Dashboard Viewer"}
          />
        );
      default:
        return null;
    }
  };

  // TODO: Move this into the return block below once it's ready to be released for all customers.
  const getRelease360Tab = () => {
    if (featureFlagHideItemInProd() === false) {
      return (
        <NavigationTab
          icon={faCircle}
          tabName={"release360"}
          handleTabClick={handleTabClick}
          activeTab={currentTab}
          tabText={"Release 360"}
        />
      );
    }
  };


  return (
    <NavigationTabContainer>
      <NavigationTab
        icon={faChartNetwork}
        tabName={"dashboards"}
        handleTabClick={handleTabClick}
        activeTab={currentTab}
        tabText={"Dashboards"}
      />
      <NavigationTab
        icon={faChartArea}
        tabName={"marketplace"}
        handleTabClick={handleTabClick}
        activeTab={currentTab}
        tabText={"Marketplace"}
      />
      {/*<NavigationTab icon={faAnalytics} tabName={"analytics"} handleTabClick={handleTabClick} activeTab={currentTab} tabText={"Analytics"} />*/}
      {/* <NavigationTab
        icon={faRadar}
        tabName={"synopsis"}
        handleTabClick={handleTabClick}
        activeTab={currentTab}
        tabText={"Synopsis"}
      />
      {getRelease360Tab()} */}
      {getActiveViewerTab()}
    </NavigationTabContainer>
  );
}

InsightsSubNavigationBar.propTypes = {
  currentTab: PropTypes.string,
};

export default InsightsSubNavigationBar;
