import React, {useState, useEffect, useRef} from 'react';
import {useHistory} from "react-router-dom";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import axios from "axios";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faAnalytics, faChartNetwork, faChartArea} from "@fortawesome/pro-light-svg-icons";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import "./marketplace.css";
import TabPanelContainer from "components/common/panels/general/TabPanelContainer";
import MarketplaceCharts from "components/insights/marketplace/charts/MarketplaceCharts";

function Marketplace () {
  const history = useHistory();
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
    }
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

    setActiveTab(tabSelection);
  };

  const getNavigationTabContainer = () => {
    return (
      <NavigationTabContainer>
        <NavigationTab icon={faChartNetwork} tabName={"dashboards"} handleTabClick={handleNavTabClick} activeTab={"marketplace"} tabText={"Dashboards"} />
        <NavigationTab icon={faChartArea} tabName={"marketplace"} handleTabClick={handleNavTabClick} activeTab={"marketplace"} tabText={"Marketplace"} />
        <NavigationTab icon={faAnalytics} tabName={"analytics"} handleTabClick={handleNavTabClick} activeTab={"marketplace"} tabText={"Analytics"} />
      </NavigationTabContainer>
    );
  }

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <CustomTab activeTab={activeTab} tabText={"Charts"} icon={faChartArea} handleTabClick={handleTabClick} tabName={"charts"} />
        {/*<CustomTab activeTab={activeTab} tabText={"Dashboards"} handleTabClick={handleTabClick} tabName={"dashboards"} />*/}
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "charts":
        return (<MarketplaceCharts />);
      case "dashboards":
      default:
        return null;
    }
  };


  return (
    <ScreenContainer
      navigationTabContainer={getNavigationTabContainer()}
      breadcrumbDestination={"marketplace"}
      pageDescription={`
        Opsera provides users with access to a vast repository of KPI. Access all available
        KPIs and configure them on your Opsera Analytics Dashboards.
      `}
    >
      <div className={"px-3"}>
        <TabPanelContainer currentView={getCurrentView()} tabContainer={getTabContainer()} />
      </div>
    </ScreenContainer>
  )
}

export default Marketplace;

