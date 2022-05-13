import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { faFileCode } from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import {
  getTableTextColumn,
  getTableTextColumnBase,
} from "components/common/table/table-column-helpers-v2";
import VanityTable from "components/common/table/VanityTable";
import { getField } from "components/common/metadata/metadata-helpers";
import {
  MERGE_SYNC_TASK_WIZARD_COMMIT_SELECTOR_CONTAINER_HEIGHTS
} from "components/tasks/details/tasks/merge_sync_task/wizard/screens/commit_selection_screen/mergeSyncTaskWizardCommitSelectorContainer.heights";
import {
  mergeSyncTaskWizardSelectedDeltaCommitMetadata
} from "components/tasks/details/tasks/merge_sync_task/wizard/screens/confirmation_screen/selected_deltas_table/mergeSyncTaskWizardSelectedDeltaCommit.metadata";

const getFormattedTextLabel = (ignoreIncoming) => {
  return ignoreIncoming === true ? "Keeping Destination Branch Changes" : "Merging In Incoming Changes";
};

const MergeSyncTaskWizardSelectedDeltasTable = (
  {
    delta,
}) => {
  const fields = mergeSyncTaskWizardSelectedDeltaCommitMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "type")),
      getTableTextColumnBase(getField(fields, "ignoreIncoming"), undefined, 260, undefined, undefined,getFormattedTextLabel),
    ],
    [],
  );


  const getFilesTable = () => {
    return (
      <VanityTable
        columns={columns}
        data={delta?.deltas}
        tableHeight={MERGE_SYNC_TASK_WIZARD_COMMIT_SELECTOR_CONTAINER_HEIGHTS.CONFIRMATION_SCREEN_CONTAINER_TABLE}
      />
    );
  };

  return (
    <FilterContainer
      icon={faFileCode}
      title={`Selected File Changes`}
      minimumHeight={MERGE_SYNC_TASK_WIZARD_COMMIT_SELECTOR_CONTAINER_HEIGHTS.CONFIRMATION_SCREEN_CONTAINER_TABLE}
      maximumHeight={MERGE_SYNC_TASK_WIZARD_COMMIT_SELECTOR_CONTAINER_HEIGHTS.CONFIRMATION_SCREEN_CONTAINER_TABLE}
      body={getFilesTable()}
    />
  );
};

MergeSyncTaskWizardSelectedDeltasTable.propTypes = {
  delta: PropTypes.object,
};

export default MergeSyncTaskWizardSelectedDeltasTable;