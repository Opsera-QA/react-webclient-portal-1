import React, { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import Model from "core/data_model/model";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import { DialogToastContext } from "contexts/DialogToastContext";
import kpiFilterMetadata from "components/admin/kpi_editor/kpi-filter-metadata";
import KpiTable from "components/admin/kpi_editor/KpiTable";
import KpiActions from "components/admin/kpi_editor/kpi-editor-actions";
import { meetsRequirements, ROLE_LEVELS } from "components/common/helpers/role-helpers";
import {truncateString} from "components/common/helpers/string-helpers"
import axios from "axios";



function KpiManagement() {
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [kpiList, setKpiList] = useState([]);
  const [kpiFilterDto, setKpiFilterDto] = useState(
    new Model({ ...kpiFilterMetadata.newObjectFields }, kpiFilterMetadata, false)
  );
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(kpiFilterDto, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (filterDto = kpiFilterDto, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(filterDto, cancelSource);
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

  const getRoles = async (filterDto = kpiFilterDto, cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (isMounted?.current === true && userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (meetsRequirements(ROLE_LEVELS.OPSERA_ADMINISTRATORS, userRoleAccess)) {
        await getKpis(filterDto, cancelSource);
      }
    }
  };

  return (
    <ScreenContainer
      breadcrumbDestination={"kpiManagement"}
      isLoading={!accessRoleData}
      accessRoleData={accessRoleData}
      roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      pageDescription={`Listed below are registered charts for the Analytics platform. 
        Each chart or KPI corresponds to a data point in the analytics platform.
      `}
    >
      <KpiTable
        loadData={loadData}
        isLoading={isLoading}
        data={kpiList}
        kpiFilterDto={kpiFilterDto}
        setKpiFilterDto={setKpiFilterDto}
      />
    </ScreenContainer>
  );
}

export default KpiManagement;
