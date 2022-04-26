import React, {useEffect, useState, useContext, useRef} from "react";
import { AuthContext } from "contexts/AuthContext";
import LoadingDialog from "components/common/status_notifications/loading";
import Model from "core/data_model/model";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import dashboardFilterMetadata from "components/insights/dashboards/dashboard-filter-metadata";
import analyticsActions from "components/settings/analytics/analytics-settings-actions";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import DashboardsTable from "components/insights/dashboards/DashboardsTable";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import AnalyticsProfileSettings from "components/settings/analytics/activateAnalyticsCard";
import InsightsSubNavigationBar from "components/insights/InsightsSubNavigationBar";
import InsightsHelpDocumentation from "../../common/help/documentation/insights/InsightsHelpDocumentation";

function SonarReports() {
  const {getUserRecord, getAccessToken, setAccessRoles} = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardsList, setDashboardsList] = useState(undefined);
  const [dashboardFilterDto, setDashboardFilterDto] = useState(new Model({...dashboardFilterMetadata.newObjectFields}, dashboardFilterMetadata, false));
  const toastContext = useContext(DialogToastContext);
  const [areAnalyticsToolsEnabled, setAreAnalyticsToolsEnabled] = useState(undefined);
  const [dashboardRoleDefinitions, setDashboardRoleDefinitions] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    isMounted.current = true;
    loadData(dashboardFilterDto, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (filterDto = dashboardFilterDto, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(filterDto, cancelSource);
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

  const getRoles = async (filterDto = dashboardFilterDto, cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);

    if (isMounted.current === true && userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      await getProfile(filterDto, cancelSource);
    }
  };

  const getProfile = async(filterDto = dashboardFilterDto, cancelSource = cancelTokenSource) => {
    const response = await analyticsActions.areAnalyticsToolsEnabled(getAccessToken, cancelSource);
    const analyticsAreEnabled = response?.data.areAnalyticsToolsEnabled;
    setAreAnalyticsToolsEnabled(analyticsAreEnabled);

    if (isMounted.current === true && analyticsAreEnabled === true) {
      await getDashboards(filterDto, cancelSource);
    }
  };

  const getDashboards = async (filterDto = dashboardFilterDto, cancelSource = cancelTokenSource) => {
    const response = await dashboardsActions.getAllDashboardsV2(getAccessToken, cancelSource, filterDto);
    const dashboards = response?.data?.data;

    if (isMounted.current === true && dashboards) {
      setDashboardRoleDefinitions(response?.data?.roles);
      setDashboardsList(dashboards);
      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", response?.data?.count);
      newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
      setDashboardFilterDto({...newFilterDto});
    }
  };

  const getInsightsView = () => {
    if (areAnalyticsToolsEnabled == null) {
      return (<LoadingDialog size="sm" message="Loading Insights"/>);
    }

    if (areAnalyticsToolsEnabled === true) {
      return null;
    }

    return (
      <div className="mt-1 max-content-width mb-1">
        <AnalyticsProfileSettings />
      </div>
    );
  };

  const getHelpDocumentation = () => {
    if (isLoading !== true) {
      return (
        <InsightsHelpDocumentation dashboardRoleDefinitions={dashboardRoleDefinitions}/>
      );
    }
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm" message="Loading Insights"/>);
  }

  return (
    <ScreenContainer
      navigationTabContainer={<InsightsSubNavigationBar currentTab={"reports"} />}
      pageDescription={`Downloadable Report for Sonar Scan`}
      breadcrumbDestination={"insights"}
      helpComponent={
        getHelpDocumentation()
      }
    >
      {getInsightsView()}
    </ScreenContainer>
  );

}


export default SonarReports;