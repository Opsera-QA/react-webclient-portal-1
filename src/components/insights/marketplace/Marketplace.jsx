import React, {useState, useEffect, useRef} from 'react';
import {useParams} from "react-router-dom";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import axios from "axios";
import { faChartArea, faChartSimple, faUserChart } from "@fortawesome/pro-light-svg-icons";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import "./marketplace.css";
import TabPanelContainer from "components/common/panels/general/TabPanelContainer";
import MarketplaceCharts from "components/insights/marketplace/charts/MarketplaceCharts";
import CustomerDashboardCatalog from "components/insights/marketplace/dashboards/templates/private/CustomerDashboardCatalog";
import InsightsSubNavigationBar from "components/insights/InsightsSubNavigationBar";
import OpseraDashboardMarketplace from "components/insights/marketplace/dashboards/templates/platform/OpseraDashboardMarketplace";

function Marketplace () {
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

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <CustomTab
          activeTab={activeTab}
          tabText={"Charts"}
          icon={faChartArea}
          handleTabClick={handleTabClick}
          tabName={"charts"}
        />
        <CustomTab
          activeTab={activeTab}
          tabText={"Opsera Marketplace"}
          icon={faChartSimple}
          handleTabClick={handleTabClick}
          tabName={"marketplace"}
        />
        <CustomTab
          activeTab={activeTab}
          tabText={"Customer Catalog"}
          icon={faUserChart}
          handleTabClick={handleTabClick}
          tabName={"catalog"}
        />
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "charts":
        return (<MarketplaceCharts dashboardId={dashboardId} />);
      case "marketplace":
        return (<OpseraDashboardMarketplace />);
      case "catalog":
        return (<CustomerDashboardCatalog />);
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
      case "marketplace":
        return (`
          Opsera offers predefined dashboards focused on topics and personas.
          This is a public catalog of Opsera provided dashboards by topic.
        `);
      case "catalog":
        return (`View and select templates created by your Organization in its private catalog.`);
      default:
        return null;
    }
  };

  return (
    <ScreenContainer
      navigationTabContainer={<InsightsSubNavigationBar currentTab={"marketplace"} />}
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

