import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { faFileCode } from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import { getTableDateTimeColumn, getTableTextColumn } from "components/common/table/table-column-helpers-v2";
import VanityTable from "components/common/table/VanityTable";
import {
  gitToGitSourceCommitFileMetadata
} from "components/tasks/details/tasks/merge_sync_task/wizard/screens/file_selection_screen/git_to_git/gitToGitSourceCommitFile.metadata";
import {
  MERGE_SYNC_TASK_WIZARD_FILE_SELECTOR_CONTAINER_HEIGHTS
} from "components/tasks/details/tasks/merge_sync_task/wizard/screens/file_selection_screen/mergeSyncTaskWizardFileSelectorContainer.heights";
import { getField } from "components/common/metadata/metadata-helpers";

const GitToGitMergeSyncTaskWizardFileSelectionSourceCommitListTable = ({
  sourceCommitList,
  isLoading,
  loadData,
  filePullCompleted,
  ruleCount,
}) => {
  const fields = gitToGitSourceCommitFileMetadata.fields;
  const noDataFilesPulledMessage = "The Source Commit Files pull has been completed. There is no data for the selected criteria.";
  const noDataFilesNotPulledMessage = "The Source Commit Files list has not been received from SFDC yet. Please click the table's refresh button to resume polling for the files.";

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "committedFile")),
      getTableTextColumn(getField(fields, "committedBy")),
      getTableTextColumn(getField(fields, "commitAction")),
      getTableDateTimeColumn(getField(fields,  "committedTime")),
      getTableTextColumn(getField(fields, "commitID")),
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

GitToGitMergeSyncTaskWizardFileSelectionSourceCommitListTable.propTypes = {
  sourceCommitList: PropTypes.array,
  filePullCompleted: PropTypes.bool,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  ruleCount: PropTypes.number,
};

export default GitToGitMergeSyncTaskWizardFileSelectionSourceCommitListTable;