import React, {useEffect, useState, useContext} from "react";
import { AuthContext } from "contexts/AuthContext";
import LoadingDialog from "components/common/status_notifications/loading";
import AccessDeniedDialog from "../common/status_notifications/accessDeniedInfo";
import {DialogToastContext} from "../../contexts/DialogToastContext";
import DashboardsTable from "./DashboardsTable";
import dashboardsActions from "./dashboards-actions";
import Model from "../../core/data_model/model";
import dashboardFilterMetadata from "./dashboard-filter-metadata";

function Insights() {
  const {getUserRecord, getAccessToken, setAccessRoles} = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardsList, setDashboardsList] = useState(undefined);
  const [dashboardFilterDto, setDashboardFilterDto] = useState(new Model({...dashboardFilterMetadata.newObjectFields}, dashboardFilterMetadata, false));
  const toastContext = useContext(DialogToastContext);

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
    }

    await getDashboards(filterDto);
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!accessRoleData.OpseraAdministrator) {
    return (<AccessDeniedDialog roleData={accessRoleData}/>);
  }

  return (
    <div className="max-content-width">
      <h4>Insights</h4>
      <p>
        OpsERA provides users with access to a vast repository of logging and analytics. Access all available
        logging, reports and configurations around the OpsERA Analytics Platform or search your currently
        configured logs repositories below.
      </p>
      <DashboardsTable
        data={dashboardsList}
        loadData={loadData}
        isLoading={isLoading}
        dashboardFilterDto={dashboardFilterDto}
        setDashboardFilterDto={setDashboardFilterDto}
        dashboardsActions={dashboardsActions}
      />
    </div>
  );

}


export default Insights;