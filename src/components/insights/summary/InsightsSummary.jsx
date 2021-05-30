import React, {useEffect, useState, useContext, useRef} from "react";
import { AuthContext } from "contexts/AuthContext";
import {useHistory} from "react-router-dom";
import LoadingDialog from "components/common/status_notifications/loading";
import Model from "core/data_model/model";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import PipelineDetails from "components/insights/summary/pipeline_details/PipelineDetails";
import ProjectDetails from "components/insights/summary/ProjectDetails";
import DashboardFiltersInput from "components/insights/dashboards/DashboardFiltersInput";
import DashboardFilterOrganizationInput from "components/insights/dashboards/DashboardFilterOrganizationInput";
import dashboardMetadata from "components/insights/dashboards/dashboard-metadata";
import {dashboardFiltersMetadata} from "components/insights/dashboards/dashboard-metadata";
import modelHelpers from "components/common/model/modelHelpers";
import {faAnalytics, faChartNetwork, faChartArea, faRadar} from "@fortawesome/pro-light-svg-icons";  

function InsightsSummary() {
  const {getUserRecord, setAccessRoles} = useContext(AuthContext);
  const history = useHistory();
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);
  const [activeTab, setActiveTab] = useState("synopsis");
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [dashboardData, setDashboardData] = useState(undefined);
  const [dashboardFilterTagsModel, setDashboardFilterTagsModel] = useState(modelHelpers.getDashboardFilterModel(dashboardData, "tags", dashboardFiltersMetadata));

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
      await getRoles(cancelSource);
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

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);

    if (isMounted.current === true && userRoleAccess) {
      setAccessRoleData(userRoleAccess);
    }
  };

  const getInsightsSummaryView = () => {
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
        <PipelineDetails dashboardData={dashboardData} setDashboardData={setDashboardData}/>
        <ProjectDetails dashboardData={dashboardData} setDashboardData={setDashboardData}/>
        </div>
      );
  };

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
        <NavigationTab icon={faChartNetwork} tabName={"dashboards"} handleTabClick={handleNavTabClick} activeTab={activeTab} tabText={"Dashboards"} />
        <NavigationTab icon={faChartArea} tabName={"marketplace"} handleTabClick={handleNavTabClick} activeTab={activeTab} tabText={"Marketplace"} />
        <NavigationTab icon={faAnalytics} tabName={"analytics"} handleTabClick={handleNavTabClick} activeTab={activeTab} tabText={"Analytics"} />
        <NavigationTab icon={faRadar} tabName={"synopsis"} handleTabClick={handleNavTabClick} activeTab={activeTab} tabText={"Synopsis"} />
      </NavigationTabContainer>
    ); 
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm" message="Loading Insights"/>);
  }

  return (
    <ScreenContainer
      navigationTabContainer={getNavigationTabContainer()}
      pageDescription={`
        Opsera provides users with access to a vast repository of logging and analytics. Access all available
        logging, reports and configurations around the Opsera Analytics Platform or search your currently
        configured logs repositories below.
      `}
      breadcrumbDestination={"insightsSummary"}
    >
      {getInsightsSummaryView()}
    </ScreenContainer>
  );

}


export default InsightsSummary;