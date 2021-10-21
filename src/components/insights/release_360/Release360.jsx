import React, {useState, useEffect, useRef, useContext} from 'react';
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import Model from "core/data_model/model";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import {faFileCertificate, faHourglass, faSearch} from "@fortawesome/pro-light-svg-icons";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import TabPanelContainer from "components/common/panels/general/TabPanelContainer";
import InsightsSubNavigationBar from "components/insights/InsightsSubNavigationBar";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import OverallReleaseDurationMetrics
  from "components/insights/release_360/views/duration/OverallReleaseDurationMetrics";
import OverallReleaseTraceabilityMetrics
  from "components/insights/release_360/views/traceability/OverallReleaseTraceabilityMetrics";
import OverallReleaseQualityMetrics from "components/insights/release_360/views/quality/OverallReleaseQualityMetrics";
import {AuthContext} from "contexts/AuthContext";
import MetricUiSandbox from "components/insights/release_360/views/sandbox/MetricUiSandbox";
import DashboardFiltersInput from "components/insights/dashboards/DashboardFiltersInput";
import DashboardFilterOrganizationInput from "components/insights/dashboards/DashboardFilterOrganizationInput";
import dashboardMetadata from "components/insights/dashboards/dashboard-metadata";
import {dashboardFiltersMetadata} from "components/insights/dashboards/dashboard-metadata";
import modelHelpers from "components/common/model/modelHelpers";

function Release360 () {
  const isMounted = useRef(false);
  const [activeTab, setActiveTab] = useState("duration");
  const [isLoading, setIsLoading] = useState(true);
  const toastContext = useContext(DialogToastContext);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [dashboardData, setDashboardData] = useState(undefined);
  const [dashboardFilterTagsModel, setDashboardFilterTagsModel] = useState(modelHelpers.getDashboardFilterModel(dashboardData, "tags", dashboardFiltersMetadata));
  const { featureFlagHideItemInProd } = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }
    let newDataObject = new Model({...dashboardMetadata.newObjectFields}, dashboardMetadata, true);
    newDataObject.setData("filters", []);
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    loadData(newDataObject, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (newDataObject, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      console.log(newDataObject);
      setDashboardData({...newDataObject});
    } catch (error) {
      if (isMounted.current === true) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    } finally {
      if (isMounted.current === true) {
        setIsLoading(false);
      }
    }
  };

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


  const getSynopsisActionBar = () => {
    return (
      <div>
        <ActionBarContainer>
          <div className="d-flex">
            <DashboardFiltersInput
              dataObject={dashboardFilterTagsModel}
              setDataObject={setDashboardFilterTagsModel}
              loadData={loadData}
              className={"mx-2"}
              dashboardData={dashboardData}
            />
            <DashboardFilterOrganizationInput
              className={"mx-2"}
              dataObject={dashboardFilterTagsModel}
              setDataObject={setDashboardFilterTagsModel}
              dashboardData={dashboardData}
              fieldName={"organizations"}
              loadData={loadData}
            />
          </div>
        </ActionBarContainer>
      </div>
    );
  };

  // TODO: Make sub components
  const getCurrentView = () => {
    switch (activeTab) {
      case "duration":
        return (<OverallReleaseDurationMetrics dashboardData={dashboardData}/>);
      case "traceability":
        return (<OverallReleaseTraceabilityMetrics dashboardData={dashboardData}/>);
      case "quality":
        return (<OverallReleaseQualityMetrics dashboardData={dashboardData}/>);
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
      {getSynopsisActionBar()}
      <div className={"px-3"}>
        <TabPanelContainer currentView={getCurrentView()} tabContainer={getTabContainer()} />
      </div>
    </ScreenContainer>
  );
}

export default Release360;

