import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import PropTypes from "prop-types";
import { faClipboardList } from "@fortawesome/pro-light-svg-icons";
import {
  getPipelineActivityStatusColumn,
  getTableDateTimeColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers-v2";
import FilterContainer from "components/common/table/FilterContainer";
import TaskDetailViewer from "components/git/git_task_details/activity_logs/activity_details/TaskDetailViewer";
import ExportPipelineActivityLogButton from "components/common/buttons/export/pipelines/ExportPipelineActivityLogButton";
import TableBase from "components/common/table/TableBase";
import TreeAndTableBase from "components/common/table/TreeAndTableBase";
import TaskActivityLogTree
  from "components/git/git_task_details/activity_logs/TaskActivityLogTree";
import {DialogToastContext} from "contexts/DialogToastContext";
function GitAllTasksActivityLogsTable({ taskLogData, taskActivityMetadata, loadData, isLoading, pipeline, taskActivityFilterDto, setTaskActivityFilterDto, taskActivityTreeData, setCurrentLogTreePage, currentLogTreePage }) {
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);
  const [currentRunNumber, setCurrentRunNumber] = useState(undefined);
  const [currentTaskName, setCurrentTaskName] = useState(undefined);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    isMounted.current = true;

    setColumns([]);
    loadColumnMetadata(taskActivityMetadata);

    return () => {
      isMounted.current = false;
    };
  }, [JSON.stringify(taskActivityMetadata)]);

  const onRowSelect = (treeGrid, row, column, e) => {
    toastContext.showOverlayPanel(<TaskDetailViewer taskActivityLogId={row._id} />);
  };

  const loadColumnMetadata = (newActivityMetadata) => {
    if (newActivityMetadata?.fields) {
      const fields = newActivityMetadata.fields;

      setColumns(
        [
          // {...getTableTextColumn(fields.find(field => { return field.id === "run_count";}), "cell-center no-wrap-inline", 100,)},
          getTableTextColumn(fields.find(field => { return field.id === "name";})),
          getTableTextColumn(fields.find(field => { return field.id === "type";})),
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

  const getNoDataMessage = () => {
    if (taskActivityFilterDto?.getData("search") !== "") {
      return ("Could not find any results with the given keywords.");
    }

    return ("Task activity data has not been generated yet. Once this Task begins running, it will publish details here.");
  };

  const getTable = () => {
    return (
      <div className={"tree-table"}>
        <TableBase
          columns={columns}
          data={getFilteredData()}
          isLoading={isLoading}
          noDataMessage={getNoDataMessage()}
          onRowSelect={onRowSelect}
        />
      </div>
    );
  };

  const getTree = () => {
    return (
      <TaskActivityLogTree
        taskLogTree={taskActivityTreeData}
        setCurrentRunNumber={setCurrentRunNumber}
        setCurrentTaskName={setCurrentTaskName}
        currentLogTreePage={currentLogTreePage}
        setCurrentLogTreePage={setCurrentLogTreePage}
      />
    );
  };

  const getTaskActivityTable = () => {
    return (
      <TreeAndTableBase
        data={taskLogData}
        isLoading={isLoading}
        noDataMessage={getNoDataMessage()}
        tableComponent={getTable()}
        loadData={loadData}
        treeComponent={getTree()}
      />
    );
  };

  return (
    <div className={"mr-2"}>
      <FilterContainer
        showBorder={false}
        loadData={loadData}
        filterDto={taskActivityFilterDto}
        setFilterDto={setTaskActivityFilterDto}
        isLoading={isLoading}
        title={"Activity Logs"}
        titleIcon={faClipboardList}
        body={getTaskActivityTable()}
        supportSearch={true}
        exportButton={<ExportPipelineActivityLogButton className={"ml-2"} isLoading={isLoading} activityLogData={taskLogData} />}
      />
    </div>
  );
}

GitAllTasksActivityLogsTable.propTypes = {
  taskLogData: PropTypes.array,
  isLoading: PropTypes.bool,
  taskActivityFilterDto: PropTypes.object,
  setTaskActivityFilterDto: PropTypes.func,
  loadData: PropTypes.func,
  pipeline: PropTypes.object,
  taskActivityMetadata: PropTypes.object,
  taskActivityTreeData: PropTypes.array,
  setCurrentLogTreePage: PropTypes.func,
  currentLogTreePage: PropTypes.number
};

export default GitAllTasksActivityLogsTable;