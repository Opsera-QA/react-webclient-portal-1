import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { faFileCode } from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import { getTableDateTimeColumn, getTableTextColumn } from "components/common/table/table-column-helpers-v2";
import VanityTable from "components/common/table/VanityTable";
import {
  MERGE_SYNC_TASK_WIZARD_FILE_SELECTOR_CONTAINER_HEIGHTS
} from "components/tasks/details/tasks/merge_sync_task/wizard/screens/file_selection_screen/mergeSyncTaskWizardFileSelectorContainer.heights";
import { getField } from "components/common/metadata/metadata-helpers";
import {
  salesforceToGitSourceCommitFileMetadata
} from "components/tasks/details/tasks/merge_sync_task/wizard/screens/file_selection_screen/salesforce_to_git/salesforceToGitSourceCommitFile.metadata";

const SalesforceToGitMergeSyncTaskWizardFileSelectionSourceCommitListTable = ({
  sourceCommitList,
  isLoading,
  loadData,
  filePullCompleted,
  ruleCount,
}) => {
  const fields = salesforceToGitSourceCommitFileMetadata.fields;
  const noDataFilesPulledMessage = "The Source Commit Files pull has been completed. There is no data for the selected criteria.";
  const noDataFilesNotPulledMessage = "The Source Commit Files list has not been received yet. Please click the table's refresh button to resume polling for the files.";
  const loadingMessage = "Pulling Source Commit File change list. Please Note: This may take some time.";

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "committedFileId")),
      getTableTextColumn(getField(fields, "componentType")),
      getTableTextColumn(getField(fields, "componentName")),
      getTableDateTimeColumn(getField(fields,  "committedTime")),
      getTableTextColumn(getField(fields, "committedBy")),
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
        loadingMessage={loadingMessage}
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

SalesforceToGitMergeSyncTaskWizardFileSelectionSourceCommitListTable.propTypes = {
  sourceCommitList: PropTypes.array,
  filePullCompleted: PropTypes.bool,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  ruleCount: PropTypes.number,
};

export default SalesforceToGitMergeSyncTaskWizardFileSelectionSourceCommitListTable;