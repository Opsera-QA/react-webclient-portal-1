import React, { useState, useEffect } from "react";
import Model from "core/data_model/model";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import kpiFilterMetadata from "components/admin/kpi_identifiers/kpi-filter-metadata";
import PipelineStorageActions from "components/admin/pipeline_storage/pipeline-storage-actions";
import PipelineStorageTable from "components/admin/pipeline_storage/PipelineStorageTable";
import PipelineStorageManagementSubNavigationBar
  from "components/admin/pipeline_storage/PipelineStorageManagementSubNavigationBar";
import useComponentStateReference from "hooks/useComponentStateReference";

function PipelineStorageManagement() {
  const [pipelineStorageMetadata, setPipelineStorageMetadata] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [pipelineStorageRecords, setPipelineStorageRecords] = useState([]);
  const [pipelineStoragePaginationModel, setPipelineStoragePaginationModel] = useState(
    new Model({ ...kpiFilterMetadata.newObjectFields }, kpiFilterMetadata, false)
  );
  const {
    isMounted,
    cancelTokenSource,
    toastContext,
    getAccessToken,
    isOpseraAdministrator,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async (filterDto = pipelineStoragePaginationModel) => {
    try {
      setPipelineStorageRecords([]);

      if (isOpseraAdministrator !== true) {
        return null;
      }

      setIsLoading(true);
      await getPipelineStorageRecords(filterDto);
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

  const getPipelineStorageRecords = async (filterDto = pipelineStoragePaginationModel) => {
    const response = await PipelineStorageActions.getPipelineStorageRecordsV2(getAccessToken, cancelTokenSource, filterDto);
    const newPipelineStorageArray = response?.data?.data;
    const metadata = response?.data?.metadata;

    if (isMounted?.current === true && Array.isArray(newPipelineStorageArray)) {
      setPipelineStorageMetadata(metadata);
      setPipelineStorageRecords(newPipelineStorageArray);
      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", response.data.count);
      newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
      setPipelineStoragePaginationModel({ ...newFilterDto });
    }
  };

  if (isOpseraAdministrator !== true) {
    return null;
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"pipelineStorageManagement"}
      navigationTabContainer={
        <PipelineStorageManagementSubNavigationBar
          activeTab={"pipelineStorageManagement"}
        />
      }
    >
      <PipelineStorageTable
        loadData={loadData}
        isLoading={isLoading}
        data={pipelineStorageRecords}
        isMounted={isMounted}
        pipelineStorageMetadata={pipelineStorageMetadata}
        pipelineStoragePaginationModel={pipelineStoragePaginationModel}
        setPipelineStoragePaginationModel={setPipelineStoragePaginationModel}
      />
    </ScreenContainer>
  );
}

export default PipelineStorageManagement;
