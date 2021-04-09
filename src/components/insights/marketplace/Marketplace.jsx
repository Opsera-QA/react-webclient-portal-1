import React, {useState, useEffect, useRef} from 'react';
import {useHistory, useParams} from "react-router-dom";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import axios from "axios";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faAnalytics, faChartNetwork, faChartArea, faUserChart, faRadar} from "@fortawesome/pro-light-svg-icons";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import "./marketplace.css";
import TabPanelContainer from "components/common/panels/general/TabPanelContainer";
import MarketplaceCharts from "components/insights/marketplace/charts/MarketplaceCharts";
import MarketplaceDashboardCatalog from "components/insights/marketplace/dashboards/MarketplaceDashboardCatalog";

function Marketplace () {
  const history = useHistory();
  const { dashboardId } = useParams();
  const isMounted = useRef(false);
  const [activeTab, setActiveTab] = useState("charts");
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    if (isMounted?.current === true) {
      setActiveTab(tabSelection);
    }
  };

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const handleNavTabClick = (tabSelection) => async e => {
    e.preventDefault();

    if (tabSelection === "analytics") {
      history.push(`/analytics`);
      return;
    }

    if (tabSelection === "marketplace") {
      history.push(`/insights/marketplace`);
      return;
    }

    if (tabSelection === "dashboards") {
      history.push(`/insights/dashboards`);
      return;
    }

    if (tabSelection === "synopsis") {
      history.push(`/insights/synopsis`);
      return;
    }

    setActiveTab(tabSelection);
  };

  const getNavigationTabContainer = () => {
    return (
      <NavigationTabContainer>
        <NavigationTab icon={faChartNetwork} tabName={"dashboards"} handleTabClick={handleNavTabClick} activeTab={"marketplace"} tabText={"Dashboards"} />
        <NavigationTab icon={faChartArea} tabName={"marketplace"} handleTabClick={handleNavTabClick} activeTab={"marketplace"} tabText={"Marketplace"} />
        <NavigationTab icon={faAnalytics} tabName={"analytics"} handleTabClick={handleNavTabClick} activeTab={"marketplace"} tabText={"Analytics"} />
        <NavigationTab icon={faRadar} tabName={"synopsis"} handleTabClick={handleNavTabClick} activeTab={activeTab} tabText={"Synopsis"} />
      </NavigationTabContainer>
    );
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <CustomTab activeTab={activeTab} tabText={"Charts"} icon={faChartArea} handleTabClick={handleTabClick} tabName={"charts"} />
        <CustomTab activeTab={activeTab} tabText={"Dashboards"} icon={faUserChart} handleTabClick={handleTabClick} tabName={"dashboards"} />
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "charts":
        return (<MarketplaceCharts dashboardId={dashboardId} />);
      case "dashboards":
        return (<MarketplaceDashboardCatalog />);
      default:
        return null;
    }
  };

  const getPageDescription = () => {
    switch (activeTab) {
      case "charts":
        return (`
          Opsera provides users with access to a vast repository of KPI. Access all available
          KPIs and configure them on your Opsera Analytics Dashboards.
        `);
      case "dashboards":
        return (`
          Opsera offers predefined dashboards focused on topics and personas.
          There is a public catalog of Opsera provided dashboards by topic as well as a private catalog for sharing within your organization.
        `);
      default:
        return null;
    }
  };

  return (
    <ScreenContainer
      navigationTabContainer={getNavigationTabContainer()}
      breadcrumbDestination={"marketplace"}
      pageDescription={getPageDescription()}
    >
      <div className={"px-3"}>
        <TabPanelContainer currentView={getCurrentView()} tabContainer={getTabContainer()} />
      </div>
    </ScreenContainer>
  );
}

export default Marketplace;

