import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { faFileCode } from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import { getTableTextColumn } from "components/common/table/table-column-helpers-v2";
import VanityTable from "components/common/table/VanityTable";
import { conflictFilesTableWizardMetadata } from "components/tasks/details/tasks/merge_sync_task/wizard/screens/confirmation_screen/conflict_files_table/conflictFilesTable.metadata";
import { getField } from "components/common/metadata/metadata-helpers";

const ConflictFilesTable = ({
  sourceCommitList,
}) => {
  const fields = conflictFilesTableWizardMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "fileName")),
    ],
    [],
  );

  const getFilesTable = () => {
    return (
      <VanityTable
        columns={columns}
        data={sourceCommitList}
      />
    );
  };

  return (
    <FilterContainer
      icon={faFileCode}
      title={`Conflict Files Table`}
      body={getFilesTable()}
    />
  );
};

ConflictFilesTable.propTypes = {
  sourceCommitList: PropTypes.array,
};

export default ConflictFilesTable;
