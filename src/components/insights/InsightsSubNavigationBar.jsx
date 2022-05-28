import React, {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {
  faChartArea,
  faChartNetwork, faCircle,
  faRadar,
  faUserChart,
  faLink,
  faMagnifyingGlass,
  faShieldKeyhole
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
      case "lookup":
        history.push(`/insights/lookup`);
        return;
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
        history.push(`/insights/connected-assets`);
        return;
      case "gitCustodian":
        history.push(`/insights/git-custodian`);
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
      <NavigationTab
        icon={faMagnifyingGlass}
        tabName={"lookup"}
        handleTabClick={handleTabClick}
        activeTab={currentTab}
        tabText={"Salesforce Lookup"}
        isBeta={true}
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
        isBeta={true}
      /> }
      {meetsRequirements(ROLE_LEVELS.ADMINISTRATORS, accessRoleData) && <NavigationTab
        icon={faShieldKeyhole}
        tabName={"gitCustodian"}
        handleTabClick={handleTabClick}
        activeTab={currentTab}
        tabText={"Git Custodian"}
        isBeta={true}
      /> }      
      {getActiveViewerTab()}
    </NavigationTabContainer>
  );
}

InsightsSubNavigationBar.propTypes = {
  currentTab: PropTypes.string
};

export default InsightsSubNavigationBar;
