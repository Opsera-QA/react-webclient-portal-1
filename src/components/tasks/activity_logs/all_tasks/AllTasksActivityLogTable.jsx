import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import TaskDetailViewer from "components/tasks/activity_logs/details/TaskDetailViewer";
import {
  getPipelineActivityStatusColumn, getTableDateTimeColumn,
  getTableTextColumn,
  getTaskTypeColumn
} from "components/common/table/table-column-helpers-v2";
import TableBase from "components/common/table/TableBase";
import {DialogToastContext} from "contexts/DialogToastContext";

function AllTasksActivityLogTable({ taskLogData, taskActivityMetadata, isLoading, currentTaskName, currentRunNumber }) {
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
    toastContext.showOverlayPanel(<TaskDetailViewer taskActivityLogId={row?._id} />);
  };

  const loadColumnMetadata = (newActivityMetadata) => {
    if (newActivityMetadata?.fields) {
      const fields = newActivityMetadata.fields;

      setColumns(
        [
          // {...getTableTextColumn(fields.find(field => { return field.id === "run_count";}), "cell-center no-wrap-inline", 100,)},
          getTableTextColumn(fields.find(field => { return field.id === "name";})),
          getTaskTypeColumn(fields.find(field => { return field.id === "type";})),
          getTableTextColumn(fields.find(field => { return field.id === "log_type";})),
          getTableTextColumn(fields.find(field => { return field.id === "message";})),
          getPipelineActivityStatusColumn(fields.find(field => { return field.id === "status";})),
          getTableDateTimeColumn(fields.find(field => { return field.id === "createdAt";}))
        ]
      );
    }
  };

  const getFilteredData = () => {
    if (currentTaskName === null || currentTaskName === undefined ) {
      return taskLogData;
    }

    return taskLogData.filter((item) => {
      if (currentRunNumber === "logs") {
        return item.name === currentTaskName;
      }

      return item.name === currentTaskName && (currentRunNumber === null || currentRunNumber === undefined || item.run_count === currentRunNumber);
    });
  };

  return (
    <div className={"tree-table"}>
      <TableBase
        columns={columns}
        data={getFilteredData()}
        isLoading={isLoading}
        onRowSelect={onRowSelect}
      />
    </div>
  );
}

AllTasksActivityLogTable.propTypes = {
  taskLogData: PropTypes.array,
  isLoading: PropTypes.bool,
  currentTaskName: PropTypes.string,
  taskActivityMetadata: PropTypes.object,
  currentRunNumber: PropTypes.number,
};

export default AllTasksActivityLogTable;