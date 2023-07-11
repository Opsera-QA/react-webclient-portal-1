import React, {useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn,
  getTagColumn,
  getTaskStatusColumn,
  getFormattedLabelWithFunctionColumnDefinition
} from "components/common/table/table-column-helpers";
import {useHistory} from "react-router-dom";
import {getField} from "components/common/metadata/metadata-helpers";
import {getTaskTypeLabel} from "components/tasks/task.types";
import { taskHelper } from "components/tasks/task.helper";
import tasksMetadata from "@opsera/definitions/constants/tasks/tasks.metadata";

export default function FreeTrialWorkspaceTaskTable(
  {
    tasks,
    taskFilterModel,
    setTaskFilterModel,
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
      getTableBooleanIconColumn(getField(fields, "active")),
      getTaskStatusColumn(getField(fields, "status")),
    ],
    [fields]
  );


  const onRowSelect = (row) => {
    history.push(taskHelper.getDetailViewLink(row?.original?._id));
  };

  return (
    <CustomTable
      className={"makeup-container-table"}
      nextGeneration={true}
      columns={columns}
      data={tasks}
      isLoading={isLoading}
      onRowSelect={onRowSelect}
      paginationDto={taskFilterModel}
      setPaginationDto={setTaskFilterModel}
      loadData={loadData}
    />
  );
}

FreeTrialWorkspaceTaskTable.propTypes = {
  tasks: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  taskFilterModel: PropTypes.object,
  setTaskFilterModel: PropTypes.func,
};