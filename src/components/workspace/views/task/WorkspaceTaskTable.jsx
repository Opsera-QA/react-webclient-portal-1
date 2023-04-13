import React, {useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn,
  getTagColumn, getTaskStatusColumn, getFormattedLabelWithFunctionColumnDefinition
} from "components/common/table/table-column-helpers";
import {useHistory} from "react-router-dom";
import {getField} from "components/common/metadata/metadata-helpers";
import {getTaskTypeLabel} from "components/tasks/task.types";
import tasksMetadata from "@opsera/definitions/constants/tasks/tasks.metadata";
import {workspaceHelper} from "components/workspace/workspace.helper";
import {hasStringValue} from "components/common/helpers/string-helpers";

export default function WorkspaceTaskTable(
  {
    tasks,
    loadData,
    isLoading,
  }) {
  const history = useHistory();
  const fields = tasksMetadata?.fields;
  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name"), "force-text-wrap"),
      getTableTextColumn(getField(fields, "run_count"), "mx-auto"),
      getFormattedLabelWithFunctionColumnDefinition(getField(fields, "type"), getTaskTypeLabel),
      getTagColumn(getField(fields, "tags")),
      getTableDateColumn(getField(fields, "createdAt")),
      getTaskStatusColumn(getField(fields, "status")),
      getTableBooleanIconColumn(getField(fields, "active")),
    ],
    [fields]
  );


  const onRowSelect = (row) => {
    const detailViewLink = workspaceHelper.getWorkspaceItemDetailLink(row?.original);

    if (hasStringValue(detailViewLink) === true) {
      history.push(detailViewLink);
    }
  };

  return (
    <CustomTable
      className={"makeup-container-table"}
      columns={columns}
      data={tasks}
      isLoading={isLoading}
      onRowSelect={onRowSelect}
      loadData={loadData}
    />
  );
}

WorkspaceTaskTable.propTypes = {
  tasks: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};