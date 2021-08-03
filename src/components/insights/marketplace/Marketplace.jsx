import React, {useState, useEffect, useRef} from 'react';
import {useParams} from "react-router-dom";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import axios from "axios";
import {faChartArea, faUserChart} from "@fortawesome/pro-light-svg-icons";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import "./marketplace.css";
import TabPanelContainer from "components/common/panels/general/TabPanelContainer";
import MarketplaceCharts from "components/insights/marketplace/charts/MarketplaceCharts";
import MarketplaceDashboardCatalog from "components/insights/marketplace/dashboards/MarketplaceDashboardCatalog";
import InsightsSubNavigationBar from "components/insights/InsightsSubNavigationBar";

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

