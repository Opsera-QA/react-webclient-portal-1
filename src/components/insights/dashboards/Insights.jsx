import React, {useEffect, useState, useContext} from "react";
import { AuthContext } from "contexts/AuthContext";
import LoadingDialog from "components/common/status_notifications/loading";
import AccessDeniedDialog from "../../common/status_notifications/accessDeniedInfo";
import {DialogToastContext} from "../../../contexts/DialogToastContext";
import DashboardsTable from "./DashboardsTable";
import dashboardsActions from "./dashboards-actions";
import Model from "../../../core/data_model/model";
import dashboardFilterMetadata from "./dashboard-filter-metadata";
import analyticsProfileActions from "../../settings/analytics/analytics-profile-settings-actions";
import AnalyticsProfileSettings from "../../settings/analytics/activateAnalyticsCard";
import ScreenContainer from "../../common/panels/general/ScreenContainer";

function Insights() {
  const {getUserRecord, getAccessToken, setAccessRoles} = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardsList, setDashboardsList] = useState(undefined);
  const [dashboardFilterDto, setDashboardFilterDto] = useState(new Model({...dashboardFilterMetadata.newObjectFields}, dashboardFilterMetadata, false));
  const toastContext = useContext(DialogToastContext);
  const [profile, setProfile] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (filterDto = dashboardFilterDto) => {
    try {
      setIsLoading(true);
      await getRoles(filterDto);
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getProfile = async(filterDto = dashboardFilterDto) => {
    let settings = await analyticsProfileActions.fetchProfile(getAccessToken);
    setProfile(settings.data);

    if (settings?.data?.enabledToolsOn) {
      await getDashboards(filterDto);
    }
  }

  const getDashboards = async (filterDto = dashboardFilterDto) => {
    const response = await dashboardsActions.getAll(filterDto, getAccessToken);
    setDashboardsList(response.data.data);
    let newFilterDto = filterDto;
    newFilterDto.setData("totalCount", response.data.count);
    newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
    setDashboardFilterDto({...newFilterDto});
  };

  const getRoles = async (filterDto = dashboardFilterDto) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      await getProfile(filterDto);
    }
  };

  const getInsightsView = () => {
    if (!profile) {
      return (<LoadingDialog size="sm" message="Loading Insights"/>);
    }

    if (profile?.enabledToolsOn) {
      return (
        <DashboardsTable
          data={dashboardsList}
          loadData={loadData}
          isLoading={isLoading}
          dashboardFilterDto={dashboardFilterDto}
          setDashboardFilterDto={setDashboardFilterDto}
          dashboardsActions={dashboardsActions}
        />
      );
    }

    return (
      <div className="mt-1 max-content-width mb-1">
        <AnalyticsProfileSettings />
      </div>
    );
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm" message="Loading Insights"/>);
  }

  return (
    <ScreenContainer
      pageDescription={`
        Opsera provides users with access to a vast repository of logging and analytics. Access all available
        logging, reports and configurations around the OpsERA Analytics Platform or search your currently
        configured logs repositories below.
      `}
      breadcrumbDestination={"insights"}
    >
      {getInsightsView()}
    </ScreenContainer>
  );

}


export default Insights;