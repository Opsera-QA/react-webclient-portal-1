import React from "react";
import PropTypes from "prop-types";
import { faClipboardList } from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import ExportPipelineActivityLogButton from "components/common/buttons/export/pipelines/ExportPipelineActivityLogButton";
import TreeAndTableBase from "components/common/table/TreeAndTableBase";
import TaskActivityLogsTable from "components/tasks/activity_logs/TaskActivityLogTable";
import TaskActivityLogTree from "components/tasks/activity_logs/TaskActivityLogTree";
import TaskStatusFilter from "components/common/filters/tasks/status/TaskStatusFilter";
import CustomTable from "components/common/table/CustomTable";

function TaskActivityLogTreeTable(
  {
    taskLogData,
    taskActivityMetadata,
    loadData,
    isLoading,
    taskActivityFilterModel,
    setTaskActivityFilterModel,
    taskActivityTreeData,
    currentRunNumber,
    setCurrentRunNumber,
    setCurrentTaskId,
    taskRunCount,
  }) {
  const getNoDataMessage = () => {
    const activeFilters = taskActivityFilterModel?.getActiveFilters();
    if (activeFilters?.length > 0) {
      return ("Could not find any results with the given filters.");
    }

    if (currentRunNumber === "latest") {
      return ("Task activity data has not been generated yet.");
    }

    if (currentRunNumber === "secondary") {
      return ("There are no secondary logs.");
    }

    if (currentRunNumber === 0) {
      return ("Task activity data has not been generated yet. Once this Task begins running, it will publish details here.");
    }

    if (currentRunNumber == null) {
      return ("Please select a run number to view its logs.");
    }

    return (`Task activity data has not been generated yet for Run ${currentRunNumber}`);
  };
  const getTable = () => {
    return (
      <TaskActivityLogsTable
        isLoading={isLoading}
        taskLogData={taskLogData}
        taskActivityMetadata={taskActivityMetadata}
      />
    );
  };

  const getTree = () => {
    return (
      <TaskActivityLogTree
        setCurrentRunNumber={setCurrentRunNumber}
        taskActivityFilterModel={taskActivityFilterModel}
        loadData={loadData}
        taskLogTree={taskActivityTreeData}
        setCurrentTaskId={setCurrentTaskId}
      />
    );
  };

  const getTaskActivityTable = () => {
    if (taskRunCount === 0) {
      return (
        <CustomTable
          isLoading={isLoading}
          data={[]}
          noDataMessage={getNoDataMessage()}
        />
      );
    }

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

  const getDropdownFilters = () => {
    return(
      <TaskStatusFilter
        className={"mb-2"}
        filterModel={taskActivityFilterModel}
        setFilterModel={setTaskActivityFilterModel}
      />
    );
  };

  return (
    <FilterContainer
      showBorder={false}
      className={"pt-2 px-2"}
      loadData={loadData}
      filterDto={taskActivityFilterModel}
      setFilterDto={setTaskActivityFilterModel}
      isLoading={isLoading}
      title={"Activity Logs"}
      titleIcon={faClipboardList}
      dropdownFilters={getDropdownFilters()}
      body={getTaskActivityTable()}
      supportSearch={true}
      exportButton={<ExportPipelineActivityLogButton className={"ml-2"} isLoading={isLoading} activityLogData={taskLogData}/>}
    />
  );
}

TaskActivityLogTreeTable.propTypes = {
  taskLogData: PropTypes.array,
  isLoading: PropTypes.bool,
  taskActivityFilterModel: PropTypes.object,
  setTaskActivityFilterModel: PropTypes.func,
  loadData: PropTypes.func,
  taskActivityMetadata: PropTypes.object,
  taskActivityTreeData: PropTypes.array,
  setCurrentRunNumber: PropTypes.func,
  currentRunNumber: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  setCurrentTaskId: PropTypes.func,
  taskRunCount: PropTypes.number,
};

export default TaskActivityLogTreeTable;