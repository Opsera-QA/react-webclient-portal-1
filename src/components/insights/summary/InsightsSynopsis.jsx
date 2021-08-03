import React, {useEffect, useState, useContext, useRef} from "react";
import { AuthContext } from "contexts/AuthContext";
import LoadingDialog from "components/common/status_notifications/loading";
import Model from "core/data_model/model";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import InsightsSynopsisDetails from "components/insights/summary/pipeline_details/InsightsSynopsisDetails";
import DashboardFiltersInput from "components/insights/dashboards/DashboardFiltersInput";
import DashboardFilterOrganizationInput from "components/insights/dashboards/DashboardFilterOrganizationInput";
import dashboardMetadata from "components/insights/dashboards/dashboard-metadata";
import {dashboardFiltersMetadata} from "components/insights/dashboards/dashboard-metadata";
import modelHelpers from "components/common/model/modelHelpers";
import InsightsSubNavigationBar from "components/insights/InsightsSubNavigationBar";

function InsightsSynopsis() {
  const {getUserRecord, setAccessRoles} = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);
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

  const getSynopsisActionBarContainer = () => {
      return (
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
      );
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm" message="Loading Insights"/>);
  }

  return (
    <ScreenContainer
      navigationTabContainer={<InsightsSubNavigationBar currentTab={"synopsis"} />}
      pageDescription={`
        Opsera provides users with access to a vast repository of logging and analytics. Access all available
        logging, reports and configurations around the Opsera Analytics Platform or search your currently
        configured logs repositories below.
      `}
      breadcrumbDestination={"insightsSummary"}
    >
      {getSynopsisActionBarContainer()}
      <InsightsSynopsisDetails dashboardData={dashboardData} setDashboardData={setDashboardData}/>
    </ScreenContainer>
  );

}


export default InsightsSynopsis;