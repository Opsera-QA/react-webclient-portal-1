import React, { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import Model from "core/data_model/model";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import { DialogToastContext } from "contexts/DialogToastContext";
import kpiFilterMetadata from "components/admin/kpi_identifiers/kpi-filter-metadata";
import { meetsRequirements, ROLE_LEVELS } from "components/common/helpers/role-helpers";
import axios from "axios";
import PipelineStorageActions from "components/admin/pipeline_storage/pipeline-storage-actions";
import PipelineStorageTable from "components/admin/pipeline_storage/PipelineStorageTable";

function PipelineStorageManagement() {
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [pipelineStorageMetadata, setPipelineStorageMetadata] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [pipelineStorageRecords, setPipelineStorageRecords] = useState([]);
  const [pipelineStoragePaginationModel, setPipelineStoragePaginationModel] = useState(
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

    loadData(pipelineStoragePaginationModel, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (filterDto = pipelineStoragePaginationModel, cancelSource = cancelTokenSource) => {
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

  const getRoles = async (filterDto = pipelineStoragePaginationModel, cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (isMounted?.current === true && userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (meetsRequirements(ROLE_LEVELS.OPSERA_ADMINISTRATORS, userRoleAccess)) {
        await getPipelineStorageRecords(filterDto, cancelSource);
      }
    }
  };

  const getPipelineStorageRecords = async (filterDto = pipelineStoragePaginationModel, cancelSource = cancelTokenSource) => {
    const response = await PipelineStorageActions.getPipelineStorageRecordsV2(getAccessToken, cancelSource, filterDto);
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

  return (
    <ScreenContainer
      breadcrumbDestination={"pipelineStorageManagement"}
      isLoading={!accessRoleData || !pipelineStorageMetadata}
      accessRoleData={accessRoleData}
      roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
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
