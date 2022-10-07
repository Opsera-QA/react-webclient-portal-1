import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn,
  getTagColumn,
  getTaskStatusColumn,
  getFormattedLabelWithFunctionColumnDefinition,
  getRoleAccessColumn,
  getLimitedTableTextColumn,
} from "components/common/table/table-column-helpers";
import { useHistory } from "react-router-dom";
import { getField } from "components/common/metadata/metadata-helpers";
import { getTaskTypeLabel } from "components/tasks/task.types";
import useComponentStateReference from "hooks/useComponentStateReference";

function TaskTable({ taskData, taskFilterModel, setTaskFilterModel, loadData, isLoading, taskMetadata }) {
  const history = useHistory();
  const [columns, setColumns] = useState([]);
  const {
    isSaasUser,
  } = useComponentStateReference();

  useEffect(() => {
    setColumns([]);
    loadColumnMetadata(taskMetadata);
  }, [JSON.stringify(taskMetadata)]);

  const loadColumnMetadata = (newActivityMetadata) => {
    if (newActivityMetadata?.fields) {
      const fields = newActivityMetadata?.fields;

      const columnsArray = [
        getTableTextColumn(getField(fields, "name"), "force-text-wrap"),
        getTableTextColumn(getField(fields, "description"), "force-text-wrap"),
        getTableTextColumn(getField(fields, "run_count"), "mx-auto"),
        getFormattedLabelWithFunctionColumnDefinition(getField(fields, "type"), getTaskTypeLabel),
        getTagColumn(getField(fields, "tags")),
        getTableDateColumn(getField(fields, "createdAt")),
        getTableBooleanIconColumn(getField(fields, "active")),
        getTaskStatusColumn(getField(fields, "status")),
      ];

      if (isSaasUser === false) {
        columnsArray.push(getRoleAccessColumn("Task"));
      }

      setColumns([...columnsArray]);
    }
  };

  const onRowSelect = (rowData) => {
    history.push({ pathname: `/task/details/${rowData?.original?._id}` });
  };

  if (taskMetadata == null) {
    return null;
  }

  return (
    <CustomTable
      className={"makeup-container-table"}
      nextGeneration={true}
      columns={columns}
      data={taskData}
      isLoading={isLoading}
      onRowSelect={onRowSelect}
      paginationDto={taskFilterModel}
      setPaginationDto={setTaskFilterModel}
      loadData={loadData}
    />
  );
}

TaskTable.propTypes = {
  taskData: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  taskFilterModel: PropTypes.object,
  setTaskFilterModel: PropTypes.func,
  taskMetadata: PropTypes.object,
};

export default TaskTable;