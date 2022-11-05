import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getGroupRoleLevelColumnDefinition,
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import tasksMetadata from "@opsera/definitions/constants/tasks/tasks.metadata";
import { taskHelper } from "components/tasks/task.helper";
import { useHistory } from "react-router-dom";

export default function LdapGroupAssignedRolesTasksTable(
  {
    group,
    tasks,
    isLoading,
  }) {
  const history = useHistory();
  const fields = tasksMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name"), "no-wrap-inline"),
      getTableTextColumn(getField(fields, "_id")),
      getGroupRoleLevelColumnDefinition(group),
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

LdapGroupAssignedRolesTasksTable.propTypes = {
  tasks: PropTypes.array,
  isLoading: PropTypes.bool,
  group: PropTypes.string,
};