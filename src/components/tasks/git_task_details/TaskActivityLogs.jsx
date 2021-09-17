import React, {useState} from "react";
import PropTypes from "prop-types";
import { faClipboardList } from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import ExportPipelineActivityLogButton from "components/common/buttons/export/pipelines/ExportPipelineActivityLogButton";
import TreeAndTableBase from "components/common/table/TreeAndTableBase";
import TaskActivityLogsTable from "components/tasks/activity_logs/TaskActivityLogTable";
import TaskActivityLogTree from "components/tasks/activity_logs/TaskActivityLogTree";
import TaskTypeFilter from "components/common/filters/tasks/type/TaskTypeFilter";
import TaskStatusFilter from "components/common/filters/tasks/status/TaskStatusFilter";
import TagFilter from "components/common/filters/tags/tag/TagFilter";

function TaskActivityLogs({ taskLogData, taskName, taskActivityMetadata, loadData, isLoading, taskActivityFilterDto, setTaskActivityFilterDto, taskActivityTreeData, setCurrentLogTreePage, currentLogTreePage }) {
  const [currentRunNumber, setCurrentRunNumber] = useState(undefined);
  const [currentStepName, setCurrentStepName] = useState(undefined);

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
        taskActivityMetadata={taskActivityMetadata}
        currentTaskName={taskName}
      />
    );
  };

  const getTree = () => {
    return (
      <TaskActivityLogTree
        setCurrentRunNumber={setCurrentRunNumber}
        currentLogTreePage={currentLogTreePage}
        setCurrentLogTreePage={setCurrentLogTreePage}
        setCurrentTaskName={setCurrentStepName}
        taskLogTree={taskActivityTreeData}
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
      className={"pt-2"}
      loadData={loadData}
      filterDto={taskActivityFilterDto}
      setFilterDto={setTaskActivityFilterDto}
      isLoading={isLoading}
      title={"Activity Logs"}
      titleIcon={faClipboardList}
      // dropdownFilters={getDropdownFilters()}
      body={getTaskActivityTable()}
      supportSearch={true}
      exportButton={<ExportPipelineActivityLogButton className={"ml-2"} isLoading={isLoading} activityLogData={taskLogData}/>}
    />
  );
}

TaskActivityLogs.propTypes = {
  taskLogData: PropTypes.array,
  isLoading: PropTypes.bool,
  taskActivityFilterDto: PropTypes.object,
  setTaskActivityFilterDto: PropTypes.func,
  loadData: PropTypes.func,
  pipeline: PropTypes.object,
  taskActivityMetadata: PropTypes.object,
  taskActivityTreeData: PropTypes.array,
  setCurrentLogTreePage: PropTypes.func,
  currentLogTreePage: PropTypes.number,
  taskName: PropTypes.string,
};

export default TaskActivityLogs;