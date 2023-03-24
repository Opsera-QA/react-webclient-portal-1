import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getTableTextColumn, getUserObjectRoleLevelColumnDefinition,
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import tasksMetadata from "@opsera/definitions/constants/tasks/tasks.metadata";
import { taskHelper } from "components/tasks/task.helper";
import { useHistory } from "react-router-dom";

export default function UserAssignedRolesTasksTable(
  {
    user,
    tasks,
    isLoading,
  }) {
  const history = useHistory();
  const fields = tasksMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name"), "no-wrap-inline"),
      getTableTextColumn(getField(fields, "_id")),
      getUserObjectRoleLevelColumnDefinition(user),
    ],
    [fields],
  );

  const onRowSelectFunction = (row, data) => {
    history.push(taskHelper.getDetailViewLink(data?._id));
  };

  return (
    <CustomTable
      isLoading={isLoading}
      onRowSelect={onRowSelectFunction}
      data={tasks}
      columns={columns}
    />
  );
}

UserAssignedRolesTasksTable.propTypes = {
  tasks: PropTypes.array,
  isLoading: PropTypes.bool,
  user: PropTypes.object,
};