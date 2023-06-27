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
  wizardModel,
}) => {
  const fields = gitToGitSourceCommitFileMetadata.fields;
  const noDataFilesPulledMessage = "The Source Commit Files pull has been completed. There is no data for the selected criteria.";
  const noDataFilesNotPulledMessage = "The Source Commit Files list has not been received yet. Please click the table's refresh button to resume polling for the files.";
  const loadingMessage = "Pulling Source Commit File change list. Please Note: This may take some time.";

  const columns = useMemo(
    () => {
      const arr = [
        getTableTextColumn(getField(fields, "committedFile")),
        getTableTextColumn(getField(fields, "committedBy")),
        getTableTextColumn(getField(fields, "commitAction")),
        getTableDateTimeColumn(getField(fields, "committedTime")),
        getTableTextColumn(getField(fields, "commitID")),
      ];
      if (wizardModel.getData("taskType") === "GIT_VS_GIT_SYNC" && wizardModel.getData("configuration.git.isSalesforce")) {
        arr.splice(1, 0, getTableTextColumn(getField(fields, "componentType")));
        arr.splice(2, 0, getTableTextColumn(getField(fields, "componentName")));
      }
      return arr;
    },
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
    return MERGE_SYNC_TASK_WIZARD_FILE_SELECTOR_CONTAINER_HEIGHTS.FILE_TABLE_CONTAINER_HEIGHT_WITHOUT_RULES;
  };

  return (
    <FilterContainer
      icon={faFileCode}
      title={`Source File Selection`}
      loadData={loadData}
      isLoading={isLoading}
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
  wizardModel: PropTypes.object,
};

export default GitToGitMergeSyncTaskWizardFileSelectionSourceCommitListTable;