import React, {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {
  faChartArea,
  faChartNetwork, faCircle,
  faRadar,
  faUserChart,
  faLink
} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import { meetsRequirements, ROLE_LEVELS } from "components/common/helpers/role-helpers";
import axios from "axios";

function InsightsSubNavigationBar({currentTab}) {
  const {getUserRecord, getAccessToken, setAccessRoles} = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const { featureFlagHideItemInProd } = useContext(AuthContext);
  const history = useHistory();

  useEffect(async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
    }
  }, []);

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
      case "connectedAssets":
        history.push(`/insights/connectedAssets`);
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
      case "reportsViewer":
        return (
          <NavigationTab
            icon={faUserChart}
            tabName={"reportsViewer"}
            handleTabClick={handleTabClick}
            activeTab={"reportsViewer"}
            tabText={"Reports Viewer"}
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
      /> */}
      {/* {getRelease360Tab()} */}
      {meetsRequirements(ROLE_LEVELS.ADMINISTRATORS, accessRoleData) && <NavigationTab
        icon={faLink}
        tabName={"connectedAssets"}
        handleTabClick={handleTabClick}
        activeTab={currentTab}
        tabText={"Connected Assets"}
      /> }
      {getActiveViewerTab()}
    </NavigationTabContainer>
  );
}

InsightsSubNavigationBar.propTypes = {
  currentTab: PropTypes.string
};

export default InsightsSubNavigationBar;
