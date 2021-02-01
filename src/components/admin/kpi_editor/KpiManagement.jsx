import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "contexts/AuthContext";
import LoadingDialog from "components/common/status_notifications/loading";
import Model from "core/data_model/model";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {DialogToastContext} from "contexts/DialogToastContext";
import kpiFilterMetadata from "components/admin/kpi_editor/kpi-filter-metadata";
import KpiTable from "components/admin/kpi_editor/KpiTable";
import KpiActions from "components/admin/kpi_editor/kpi-editor-actions";

function KpiManagement() {
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [kpiList, setKpiList] = useState([]);
  const [kpiFilterDto, setKpiFilterDto] = useState(new Model({...kpiFilterMetadata.newObjectFields}, kpiFilterMetadata, false));

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (newFilterDto = kpiFilterDto) => {
    try {
      setIsLoading(true);
      await getRoles(newFilterDto);
    }
    catch (error) {
      console.log(error);
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const getKpis = async (filterDto) => {
    const response = await KpiActions.getKpis(filterDto, getAccessToken);

    if (response?.data) {
      setKpiList(response.data.data);
      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", response.data.count);
      newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
      setKpiFilterDto({...newFilterDto});
    }
  };

  const getRoles = async (newFilterDto = kpiFilterDto) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (userRoleAccess?.OpseraAdministrator || userRoleAccess?.Administrator) {
        await getKpis(newFilterDto);
      }
    }
  };

  return (
    <ScreenContainer
      isLoading={!accessRoleData}
      breadcrumbDestination={"kpiManagement"}
      accessDenied={!accessRoleData?.OpseraAdministrator && !accessRoleData?.Administrator}
      pageDescription={
        `Listed below are registered charts for the Analytics platform. 
        Each chart or KPI corresponds to a data point in the analytics platform.
      `}
    >
        <KpiTable loadData={loadData} data={kpiList} isLoading={isLoading} kpiFilterDto={kpiFilterDto} setKpiFilterDto={setKpiFilterDto}/>
    </ScreenContainer>
  );
}


export default KpiManagement;