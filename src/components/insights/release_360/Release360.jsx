import React, {useState, useEffect, useRef, useContext} from 'react';
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import axios from "axios";
import {faFileCertificate, faHourglass, faSearch} from "@fortawesome/pro-light-svg-icons";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import TabPanelContainer from "components/common/panels/general/TabPanelContainer";
import InsightsSubNavigationBar from "components/insights/InsightsSubNavigationBar";
import OverallReleaseDurationMetrics
  from "components/insights/release_360/views/duration/OverallReleaseDurationMetrics";
import OverallReleaseTraceabilityMetrics
  from "components/insights/release_360/views/traceability/OverallReleaseTraceabilityMetrics";
import OverallReleaseQualityMetrics from "components/insights/release_360/views/quality/OverallReleaseQualityMetrics";
import {AuthContext} from "contexts/AuthContext";
import MetricUiSandbox from "components/insights/release_360/views/sandbox/MetricUiSandbox";

function Release360 () {
  const isMounted = useRef(false);
  const [activeTab, setActiveTab] = useState("duration");
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const { featureFlagHideItemInProd } = useContext(AuthContext);

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

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    if (isMounted?.current === true) {
      setActiveTab(tabSelection);
    }
  };

  const getSandbox = () => {
    if (featureFlagHideItemInProd() === false) {
      return (
        <CustomTab
          activeTab={activeTab}
          tabText={"Metric UI Sandbox"}
          icon={faFileCertificate}
          handleTabClick={handleTabClick}
          tabName={"sandbox"}
        />
      );
    }
  };

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
        {getSandbox()}
      </CustomTabContainer>
    );
  };

  // TODO: Make sub components
  const getCurrentView = () => {
    switch (activeTab) {
      case "duration":
        return (<OverallReleaseDurationMetrics />);
      case "traceability":
        return (<OverallReleaseTraceabilityMetrics />);
      case "quality":
        return (<OverallReleaseQualityMetrics />);
      case "sandbox":
        return (<MetricUiSandbox />);
      default:
        return null;
    }
  };

  if (featureFlagHideItemInProd()) {
    return null;
  }

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

