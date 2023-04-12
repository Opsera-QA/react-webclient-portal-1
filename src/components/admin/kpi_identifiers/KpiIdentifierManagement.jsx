import React, { useState, useEffect } from "react";
import Model from "core/data_model/model";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import kpiFilterMetadata from "components/admin/kpi_identifiers/kpi-filter-metadata";
import KpiIdentifierTable from "components/admin/kpi_identifiers/KpiIdentifierTable";
import KpiActions from "components/admin/kpi_identifiers/kpi.actions";
import KpiIdentifierManagementSubNavigationBar
  from "components/admin/kpi_identifiers/KpiIdentifierManagementSubNavigationBar";
import useComponentStateReference from "hooks/useComponentStateReference";

function KpiIdentifierManagement() {
  const [isLoading, setIsLoading] = useState(true);
  const [kpiList, setKpiList] = useState([]);
  const [kpiFilterDto, setKpiFilterDto] = useState(
    new Model({ ...kpiFilterMetadata.newObjectFields }, kpiFilterMetadata, false)
  );
  const {
    accessRoleData,
    getAccessToken,
    toastContext,
    cancelTokenSource,
    isMounted,
    isOpseraAdministrator,
  } = useComponentStateReference();

  useEffect(() => {
    loadData(kpiFilterDto).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async (filterDto = kpiFilterDto, cancelSource = cancelTokenSource) => {
    try {
      setKpiList([]);

      if (isOpseraAdministrator !== true) {
        return;
      }

      setIsLoading(true);
      await getKpis(filterDto, cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getKpis = async (filterDto = kpiFilterDto, cancelSource = cancelTokenSource) => {
    const response = await KpiActions.getKpisV2(getAccessToken, cancelSource, filterDto);

    if (isMounted?.current === true && response?.data?.data) {
      setKpiList(response.data.data);
      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", response.data.count);
      newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
      setKpiFilterDto({ ...newFilterDto });
    }
  };

  return (
    <ScreenContainer
      breadcrumbDestination={"kpiManagement"}
      isLoading={accessRoleData == null}
      accessDenied={isOpseraAdministrator !== true}
      navigationTabContainer={<KpiIdentifierManagementSubNavigationBar activeTab={"kpiIdentifierManagement"} />}
    >
      <KpiIdentifierTable
        loadData={loadData}
        isLoading={isLoading}
        data={kpiList}
        kpiFilterDto={kpiFilterDto}
        setKpiFilterDto={setKpiFilterDto}
      />
    </ScreenContainer>
  );
}

export default KpiIdentifierManagement;
