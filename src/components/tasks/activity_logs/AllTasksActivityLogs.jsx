import React, {useState} from "react";
import PropTypes from "prop-types";
import { faClipboardList } from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import ExportPipelineActivityLogButton from "components/common/buttons/export/pipelines/ExportPipelineActivityLogButton";
import TreeAndTableBase from "components/common/table/TreeAndTableBase";
import TaskActivityLogTree
  from "components/tasks/activity_logs/TaskActivityLogTree";
import TaskTypeFilter from "components/common/filters/tasks/type/TaskTypeFilter";
import TagFilter from "components/common/filters/tags/tag/TagFilter";
import TaskStatusFilter from "components/common/filters/tasks/status/TaskStatusFilter";
import TaskActivityLogsTable from "components/tasks/activity_logs/TaskActivityLogTable";

function AllTasksActivityLogs({ taskLogData, taskActivityMetadata, loadData, isLoading, taskActivityFilterDto, setTaskActivityFilterDto, taskActivityTreeData, setCurrentLogTreePage, currentLogTreePage }) {
  const [currentRunNumber, setCurrentRunNumber] = useState(undefined);
  const [currentTaskName, setCurrentTaskName] = useState(undefined);

  const getNoDataMessage = () => {
    if (taskActivityFilterDto?.getData("search") !== "") {
      return ("Could not find any results with the given keywords.");
    }

    return ("Task activity data has not been generated yet. Once this Task begins running, it will publish details here.");
  };

  const getTable = () => {
    return (
      <TaskActivityLogsTable
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
    return(
      <>
        <TaskTypeFilter
          filterModel={taskActivityFilterDto}
          setFilterModel={setTaskActivityFilterDto}
          className={"mb-2"}
        />
        <TaskStatusFilter
          className={"mb-2"}
          filterModel={taskActivityFilterDto}
          setFilterModel={setTaskActivityFilterDto}
        />
        <TagFilter
          filterDto={taskActivityFilterDto}
          setFilterDto={setTaskActivityFilterDto}
        />
      </>
    );
  };


  return (
    <FilterContainer
      showBorder={false}
      loadData={loadData}
      filterDto={taskActivityFilterDto}
      setFilterDto={setTaskActivityFilterDto}
      isLoading={isLoading}
      title={"Activity Logs"}
      className={"px-2 pb-2"}
      titleIcon={faClipboardList}
      body={getTaskActivityTable()}
      // dropdownFilters={getDropdownFilters()}
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
  taskActivityFilterDto: PropTypes.object,
  setTaskActivityFilterDto: PropTypes.func,
  loadData: PropTypes.func,
  taskActivityMetadata: PropTypes.object,
  taskActivityTreeData: PropTypes.array,
  setCurrentLogTreePage: PropTypes.func,
  currentLogTreePage: PropTypes.number,
};

export default AllTasksActivityLogs;