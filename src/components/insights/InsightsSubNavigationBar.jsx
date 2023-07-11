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
import useComponentStateReference from "hooks/useComponentStateReference";
import GitCustodianRoleHelper from "@opsera/know-your-role/roles/compliance/git_custodian/gitCustodianRole.helper";
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";

function InsightsSubNavigationBar({currentTab}) {
  const { featureFlagHideItemInProd } = useContext(AuthContext);
  const history = useHistory();
  const {
    isSiteAdministrator,
    isSaasUser,
    userData,
  } = useComponentStateReference();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    switch (tabSelection) {
    /*case "analytics":
        history.push(`/insights/analytics`);
        return;*/
      case "salesforce":
        history.push(`/insights/salesforce`);
        return;
      case "lookup":
        history.push(`/insights/salesforce/lookup`);
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
        icon={faSalesforce}
        tabName={"salesforce"}
        handleTabClick={handleTabClick}
        activeTab={currentTab}
        tabText={"Salesforce Insights"}
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
      <NavigationTab
        icon={faLink}
        tabName={"connectedAssets"}
        handleTabClick={handleTabClick}
        activeTab={currentTab}
        tabText={"Connected Assets"}
        isBeta={true}
        visible={isSaasUser === true || isSiteAdministrator === true}
      />
      <NavigationTab
        icon={faShieldKeyhole}
        tabName={"gitCustodian"}
        handleTabClick={handleTabClick}
        activeTab={currentTab}
        tabText={"Git Custodian"}
        visible={GitCustodianRoleHelper.canViewGitCustodian(userData) === true}
      />
      {getActiveViewerTab()}
    </NavigationTabContainer>
  );
}

InsightsSubNavigationBar.propTypes = {
  currentTab: PropTypes.string
};

export default InsightsSubNavigationBar;
