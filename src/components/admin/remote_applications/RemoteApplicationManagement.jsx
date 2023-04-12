import React, { useState, useEffect } from "react";
import Model from "core/data_model/model";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import { ROLE_LEVELS } from "components/common/helpers/role-helpers";
import RemoteApplicationTelemetryActions from "components/admin/remote_applications/remote-application-actions";
import RemoteApplicationTelemetryTable from "components/admin/remote_applications/RemoteApplicationTelemetryTable";
import RemoteApplicationTelemetryManagementSubNavigationBar
  from "components/admin/remote_applications/RemoteApplicationTelemetryManagementSubNavigationBar";
import kpiFilterMetadata from "../kpi_identifiers/kpi-filter-metadata";
import useComponentStateReference from "hooks/useComponentStateReference";

function RemoteApplicationManagement() {
  const [remoteApplicationMetadata, setRemoteApplicationTelemetryMetadata] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [remoteApplicationRecords, setRemoteApplicationTelemetryRecords] = useState([]);
  const [remoteApplicationPaginationModel, setRemoteApplicationTelemetryPaginationModel] = useState(
      new Model({ ...kpiFilterMetadata.newObjectFields }, kpiFilterMetadata, false)
  );
  const {
    isMounted,
    cancelTokenSource,
    accessRoleData,
    getAccessToken,
    toastContext,
    isOpseraAdministrator,
  } = useComponentStateReference();

  useEffect(() => {
    loadData(remoteApplicationPaginationModel).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async (filterDto = remoteApplicationPaginationModel) => {
    try {
      setRemoteApplicationTelemetryRecords([]);

      if (isOpseraAdministrator !== true) {
        return;
      }

      setIsLoading(true);
      await getRemoteApplicationTelemetryRecords(filterDto);
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
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

  if (isOpseraAdministrator !== true) {
    return null;
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"remoteApplications"}
      isLoading={!remoteApplicationMetadata}
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
