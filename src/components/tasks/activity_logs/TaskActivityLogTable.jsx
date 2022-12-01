import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import TaskDetailViewer from "components/tasks/activity_logs/details/TaskDetailViewer";
import {
  getPipelineActivityStatusColumn, getTableDateTimeColumn,
  getTableTextColumn, getFormattedLabelWithFunctionColumnDefinition
} from "components/common/table/table-column-helpers-v2";
import TableBase from "components/common/table/TableBase";
import {DialogToastContext} from "contexts/DialogToastContext";
import {getField} from "components/common/metadata/metadata-helpers";
import {getTaskTypeLabel} from "components/tasks/task.types";
import TableBodyLoadingWrapper from "components/common/table/TableBodyLoadingWrapper";

export default function TaskActivityLogsTable(
  {
    taskLogData,
    taskActivityMetadata,
    isLoading,
    noDataMessage,
  }) {
  const [columns, setColumns] = useState([]);
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    setColumns([]);
    loadColumnMetadata(taskActivityMetadata);

    return () => {
      isMounted.current = false;
    };
  }, [JSON.stringify(taskActivityMetadata)]);

  const onRowSelect = (treeGrid, row) => {
    toastContext.showOverlayPanel(
      <TaskDetailViewer
        taskActivityLogId={row?._id}
      />
    );
  };

  const loadColumnMetadata = (newActivityMetadata) => {
    if (newActivityMetadata?.fields) {
      const fields = newActivityMetadata.fields;

      setColumns(
        [
          // {...getTableTextColumn(fields.find(field => { return field.id === "run_count";}), "cell-center no-wrap-inline", 100,)},
          getTableTextColumn(getField(fields, "name")),
          getFormattedLabelWithFunctionColumnDefinition(getField(fields, "type"), getTaskTypeLabel),
          getTableTextColumn(getField(fields, "log_type")),
          getTableTextColumn(getField(fields, "message")),
          getPipelineActivityStatusColumn(getField(fields, "status")),
          getTableDateTimeColumn(getField(fields, "createdAt")),
        ]
      );
    }
  };

  const getTable = () => {
    return (
      <TableBase
        columns={columns}
        data={taskLogData}
        isLoading={isLoading}
        onRowSelect={onRowSelect}
      />
    )
  };

  return (
    <div className={"tree-table"}>
      <TableBodyLoadingWrapper
        isLoading={isLoading}
        data={taskLogData}
        noDataMessage={noDataMessage}
      />
    </div>
  );
}
TaskActivityLogsTable.propTypes = {
  taskLogData: PropTypes.array,
  isLoading: PropTypes.bool,
  taskActivityMetadata: PropTypes.object,
  noDataMessage: PropTypes.any,
};