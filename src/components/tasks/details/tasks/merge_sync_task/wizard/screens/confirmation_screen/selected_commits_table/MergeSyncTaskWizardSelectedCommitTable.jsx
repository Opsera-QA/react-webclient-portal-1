import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { faFileCode } from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import {
  getTableTextColumn,
  getTableTextColumnBase,
} from "components/common/table/table-column-helpers-v2";
import VanityTable from "components/common/table/VanityTable";
import {
  mergeSyncTaskWizardSelectedCommitMetadata
} from "components/tasks/details/tasks/merge_sync_task/wizard/screens/confirmation_screen/selected_commits_table/mergeSyncTaskWizardSelectedCommit.metadata";
import { getField } from "components/common/metadata/metadata-helpers";

const getFormattedTextLabel = (fieldName) => {
  switch (fieldName) {
    case "destinationContent":
      return "Keeping Destination Branch Changes";
    case "sourceContent":
      return "Merging in Source Branch Changes";
  }

  return fieldName;
};

const MergeSyncTaskWizardSelectedCommitTable = ({
  sourceCommitList,
}) => {
  const fields = mergeSyncTaskWizardSelectedCommitMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "fileName")),
      getTableTextColumnBase(getField(fields, "fieldName"), undefined, 260, undefined, undefined,getFormattedTextLabel),
    ],
    [],
  );

  const getFilesTable = () => {
    return (
      <VanityTable
        columns={columns}
        data={sourceCommitList}
        // tableHeight={getHeight()}
      />
    );
  };

  // TODO: Set height to what makes sense
  return (
    <FilterContainer
      icon={faFileCode}
      title={`Selected Commits`}
      // minimumHeight={getHeight()}
      // maximumHeight={getHeight()}
      body={getFilesTable()}
    />
  );
};

MergeSyncTaskWizardSelectedCommitTable.propTypes = {
  sourceCommitList: PropTypes.array,
};

export default MergeSyncTaskWizardSelectedCommitTable;