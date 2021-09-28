import React, {useState, useEffect, useRef} from 'react';
import {useParams} from "react-router-dom";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import axios from "axios";
import {faFileCertificate, faHourglass, faSearch} from "@fortawesome/pro-light-svg-icons";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import TabPanelContainer from "components/common/panels/general/TabPanelContainer";
import InsightsSubNavigationBar from "components/insights/InsightsSubNavigationBar";

function Release360 () {
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
          tabText={"Overall Release Duration"}
          icon={faHourglass}
          handleTabClick={handleTabClick}
          tabName={"duration"}
        />
        <CustomTab
          activeTab={activeTab}
          tabText={"Overall Release Traceability"}
          icon={faSearch}
          handleTabClick={handleTabClick}
          tabName={"traceability"}
        />
        <CustomTab
          activeTab={activeTab}
          tabText={"Overall Release Quality"}
          icon={faFileCertificate}
          handleTabClick={handleTabClick}
          tabName={"quality"}
        />
      </CustomTabContainer>
    );
  };

  // TODO: Make sub components
  const getCurrentView = () => {
    switch (activeTab) {
      // case "duration":
      //   return (<MarketplaceCharts dashboardId={dashboardId} />);
      // case "traceability":
      //   return (<MarketplaceDashboardCatalog />);
      // case "quality":
      //   return (<MarketplaceDashboardCatalog />);
      default:
        return null;
    }
  };

  return (
    <ScreenContainer
      navigationTabContainer={<InsightsSubNavigationBar currentTab={"release360"} />}
      breadcrumbDestination={"release360"}
      pageDescription={"Put Release 360 Description here"}
    >
      <div className={"px-3"}>
        <TabPanelContainer currentView={getCurrentView()} tabContainer={getTabContainer()} />
      </div>
    </ScreenContainer>
  );
}

export default Release360;

