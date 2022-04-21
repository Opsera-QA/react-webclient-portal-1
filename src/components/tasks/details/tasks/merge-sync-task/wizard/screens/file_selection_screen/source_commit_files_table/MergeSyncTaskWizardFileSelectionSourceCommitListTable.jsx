import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { faFileCode } from "@fortawesome/pro-light-svg-icons";
import { EXTERNAL_API_INTEGRATOR_ENDPOINT_PARAMETER_INPUT_HEIGHTS } from "components/inventory/tools/details/identifiers/external_api_integrator/endpoints/externalApiIntegratorEndpointInput.heights";
import FilterContainer from "components/common/table/FilterContainer";
import { getTableDateTimeColumn, getTableTextColumn } from "components/common/table/table-column-helpers-v2";
import VanityTable from "components/common/table/VanityTable";
import {
  sourceCommitFileMetadata
} from "components/tasks/details/tasks/merge-sync-task/wizard/screens/file_selection_screen/source_commit_files_table/sourceCommitFile.metadata";

const MergeSyncTaskWizardFileSelectionSourceCommitListTable = ({
  sourceCommitList,
  isLoading,
  loadData,
  filePullCompleted,
}) => {
  const fields = sourceCommitFileMetadata.fields;
  const noDataFilesPulledMessage = "The Source Commit Files pull has been completed. There is no data for the selected criteria.";
  const noDataFilesNotPulledMessage = "The Source Commit Files list has not been received from SFDC yet. Please click the table's refresh button to resume polling for the files.";

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "committedFile";})),
      getTableTextColumn(fields.find(field => { return field.id === "committedBy";})),
      getTableTextColumn(fields.find(field => { return field.id === "commitAction";})),
      getTableDateTimeColumn(fields.find(field => { return field.id === "committedTime";})),
      getTableTextColumn(fields.find(field => { return field.id === "commitID";})),
    ],
    [],
  );

  const getFilesTable = () => {
    return (
      <VanityTable
        columns={columns}
        data={sourceCommitList}
        isLoading={isLoading}
        loadData={loadData}
        noDataMessage={filePullCompleted ? noDataFilesPulledMessage : noDataFilesNotPulledMessage}
        // paginationModel={paginationModel}
        // setPaginationModel={setPaginationModel}
      />
    );
  };

  // TODO: Set height to what makes sense
  return (
    <FilterContainer
      icon={faFileCode}
      title={`Source File Selection`}
      loadData={loadData}
      isLoading={isLoading}
      minimumHeight={
        EXTERNAL_API_INTEGRATOR_ENDPOINT_PARAMETER_INPUT_HEIGHTS.EXTERNAL_API_INTEGRATOR_ENDPOINT_PARAMETERS_CONTAINER_HEIGHT
      }
      maximumHeight={
        EXTERNAL_API_INTEGRATOR_ENDPOINT_PARAMETER_INPUT_HEIGHTS.EXTERNAL_API_INTEGRATOR_ENDPOINT_PARAMETERS_CONTAINER_HEIGHT
      }
      body={getFilesTable()}
    />
  );
};

MergeSyncTaskWizardFileSelectionSourceCommitListTable.propTypes = {
  sourceCommitList: PropTypes.array,
  filePullCompleted: PropTypes.bool,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
};

export default MergeSyncTaskWizardFileSelectionSourceCommitListTable;