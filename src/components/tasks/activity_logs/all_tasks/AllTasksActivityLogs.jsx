import React, {useState} from "react";
import PropTypes from "prop-types";
import { faClipboardList } from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import ExportPipelineActivityLogButton from "components/common/buttons/export/pipelines/ExportPipelineActivityLogButton";
import TreeAndTableBase from "components/common/table/TreeAndTableBase";
import TaskActivityLogTree
  from "components/tasks/activity_logs/TaskActivityLogTree";
import TaskTypeFilter from "components/common/filters/tasks/type/TaskTypeFilter";
import TaskStatusFilter from "components/common/filters/tasks/status/TaskStatusFilter";
import InlineTaskTypeFilter from "components/common/filters/tasks/type/InlineTaskTypeFilter";
import AllTasksActivityLogTable from "components/tasks/activity_logs/all_tasks/AllTasksActivityLogTable";

function AllTasksActivityLogs({ taskLogData, taskActivityMetadata, loadData, isLoading, taskActivityFilterModel, setTaskActivityFilterModel, taskActivityTreeData, setCurrentLogTreePage, currentLogTreePage }) {
  const [currentRunNumber, setCurrentRunNumber] = useState(undefined);
  const [currentTaskName, setCurrentTaskName] = useState(undefined);

  const getNoDataMessage = () => {
    const activeFilters = taskActivityFilterModel?.getActiveFilters();
    if (activeFilters?.length > 0) {
      return ("Could not find any results with the given filters.");
    }

    return ("Task activity data has not been generated yet. Once this Task begins running, it will publish details here.");
  };

  const getTable = () => {
    return (
      <AllTasksActivityLogTable
        isLoading={isLoading}
        taskLogData={taskLogData}
        currentRunNumber={currentRunNumber}
        currentTaskName={currentTaskName}
        taskActivityMetadata={taskActivityMetadata}
      />
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
        taskActivityFilterModel={taskActivityFilterModel}
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

  const getDropdownFilters = () => {
    return (
      <>
        <TaskTypeFilter
          filterModel={taskActivityFilterModel}
          setFilterModel={setTaskActivityFilterModel}
          className={"mb-2"}
        />
        <TaskStatusFilter
          className={"mb-2"}
          filterModel={taskActivityFilterModel}
          setFilterModel={setTaskActivityFilterModel}
        />
      </>
    );
  };


  return (
    <FilterContainer
      showBorder={false}
      loadData={loadData}
      filterDto={taskActivityFilterModel}
      setFilterDto={setTaskActivityFilterModel}
      isLoading={isLoading}
      title={"Activity Logs"}
      className={"px-2 pb-2"}
      titleIcon={faClipboardList}
      dropdownFilters={getDropdownFilters()}
      inlineFilters={
        <InlineTaskTypeFilter
          filterModel={taskActivityFilterModel}
          setFilterModel={setTaskActivityFilterModel}
          loadData={loadData}
          className={"mr-2"}
        />
      }
      body={getTaskActivityTable()}
      supportSearch={true}
      exportButton={
        <ExportPipelineActivityLogButton
          className={"ml-2"}
          isLoading={isLoading}
          activityLogData={taskLogData}/>
      }
    />
  );
}

AllTasksActivityLogs.propTypes = {
  taskLogData: PropTypes.array,
  isLoading: PropTypes.bool,
  taskActivityFilterModel: PropTypes.object,
  setTaskActivityFilterModel: PropTypes.func,
  loadData: PropTypes.func,
  taskActivityMetadata: PropTypes.object,
  taskActivityTreeData: PropTypes.array,
  setCurrentLogTreePage: PropTypes.func,
  currentLogTreePage: PropTypes.number,
};

export default AllTasksActivityLogs;