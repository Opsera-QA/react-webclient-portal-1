import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { faFileCode } from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import { getTableDateTimeColumn, getTableTextColumn } from "components/common/table/table-column-helpers-v2";
import VanityTable from "components/common/table/VanityTable";
import {
  sourceCommitFileMetadata
} from "components/tasks/details/tasks/merge_sync_task/wizard/screens/file_selection_screen/source_commit_files_table/sourceCommitFile.metadata";
import {
  MERGE_SYNC_TASK_WIZARD_FILE_SELECTOR_CONTAINER_HEIGHTS
} from "components/tasks/details/tasks/merge_sync_task/wizard/screens/file_selection_screen/mergeSyncTaskWizardFileSelectorContainer.heights";

const MergeSyncTaskWizardFileSelectionSourceCommitListTable = ({
  sourceCommitList,
  isLoading,
  loadData,
  filePullCompleted,
  ruleCount,
}) => {
  const fields = sourceCommitFileMetadata.fields;
  const noDataFilesPulledMessage = "The Source Commit Files pull has been completed. There is no data for the selected criteria.";
  const noDataFilesNotPulledMessage = "The Source Commit Files list has not been received from SFDC yet. Please click the table's refresh button to resume polling for the files.";

  const getDynamicColumn = () => {

  };

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
        tableHeight={getHeight()}
        // paginationModel={paginationModel}
        // setPaginationModel={setPaginationModel}
      />
    );
  };

  const getHeight = () => {
    if (ruleCount > 0) {
      return MERGE_SYNC_TASK_WIZARD_FILE_SELECTOR_CONTAINER_HEIGHTS.FILE_TABLE_CONTAINER_HEIGHT_WITH_RULES;
    }

    return MERGE_SYNC_TASK_WIZARD_FILE_SELECTOR_CONTAINER_HEIGHTS.FILE_TABLE_CONTAINER_HEIGHT_WITHOUT_RULES;
  };

  // TODO: Set height to what makes sense
  return (
    <FilterContainer
      icon={faFileCode}
      title={`Source File Selection`}
      loadData={loadData}
      isLoading={isLoading}
      minimumHeight={getHeight()}
      maximumHeight={getHeight()}
      body={getFilesTable()}
    />
  );
};

MergeSyncTaskWizardFileSelectionSourceCommitListTable.propTypes = {
  sourceCommitList: PropTypes.array,
  filePullCompleted: PropTypes.bool,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  ruleCount: PropTypes.number,
};

export default MergeSyncTaskWizardFileSelectionSourceCommitListTable;