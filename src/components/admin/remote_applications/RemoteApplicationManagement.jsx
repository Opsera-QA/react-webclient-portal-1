import React, { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import Model from "core/data_model/model";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import { DialogToastContext } from "contexts/DialogToastContext";
import remoteApplicationFilterMetadata from "components/admin/remote_applications/remoteapplications-filter-metadata";
import { meetsRequirements, ROLE_LEVELS } from "components/common/helpers/role-helpers";
import axios from "axios";
import RemoteApplicationTelemetryActions from "components/admin/remote_applications/remote-application-actions";
import RemoteApplicationTelemetryTable from "components/admin/remote_applications/RemoteApplicationTelemetryTable";
import RemoteApplicationTelemetryManagementSubNavigationBar
  from "components/admin/remote_applications/RemoteApplicationTelemetryManagementSubNavigationBar";
import kpiFilterMetadata from "../kpi_identifiers/kpi-filter-metadata";

function RemoteApplicationManagement() {
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [remoteApplicationMetadata, setRemoteApplicationTelemetryMetadata] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [remoteApplicationRecords, setRemoteApplicationTelemetryRecords] = useState([]);
  const [remoteApplicationPaginationModel, setRemoteApplicationTelemetryPaginationModel] = useState(
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

    loadData(remoteApplicationPaginationModel, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (filterDto = remoteApplicationPaginationModel, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getTelemetry(filterDto, cancelSource);
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

  const getTelemetry = async (filterDto = remoteApplicationPaginationModel, cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (isMounted?.current === true && userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (meetsRequirements(ROLE_LEVELS.OPSERA_ADMINISTRATORS, userRoleAccess)) {
        await getRemoteApplicationTelemetryRecords(filterDto, cancelSource);
      }
    }
  };

  const getRemoteApplicationTelemetryRecords = async (filterDto = remoteApplicationPaginationModel, cancelSource = cancelTokenSource) => {
    const response = await RemoteApplicationTelemetryActions.getRemoteApplicationTelemetryRecordsV2(getAccessToken, cancelSource, filterDto);
    const newRemoteApplicationTelemetryArray = response?.data?.data;
    const metadata = response?.data?.metadata;

    if (isMounted?.current === true && Array.isArray(newRemoteApplicationTelemetryArray)) {
      setRemoteApplicationTelemetryMetadata(metadata);
      setRemoteApplicationTelemetryRecords(newRemoteApplicationTelemetryArray);
      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", response.data.count);
      newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
      setRemoteApplicationTelemetryPaginationModel({ ...newFilterDto });
    }
  };

  return (
    <ScreenContainer
      breadcrumbDestination={"remoteApplications"}
      isLoading={!accessRoleData || !remoteApplicationMetadata}
      accessRoleData={accessRoleData}
      roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      navigationTabContainer={
        <RemoteApplicationTelemetryManagementSubNavigationBar
          activeTab={"remoteApplicationManagement"}
        />
      }
    >
      <RemoteApplicationTelemetryTable
        loadData={loadData}
        isLoading={isLoading}
        data={remoteApplicationRecords}
        isMounted={isMounted}
        remoteApplicationMetadata={remoteApplicationMetadata}
        remoteApplicationPaginationModel={remoteApplicationPaginationModel}
        setRemoteApplicationPaginationModel={setRemoteApplicationTelemetryPaginationModel}
      />
    </ScreenContainer>
  );
}

export default RemoteApplicationManagement;
