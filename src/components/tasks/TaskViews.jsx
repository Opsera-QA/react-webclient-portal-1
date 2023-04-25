import React from "react";
import TableCardView from "components/common/table/TableCardView";
import ActiveFilter from "components/common/filters/status/ActiveFilter";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import {faTasks} from "@fortawesome/pro-light-svg-icons";
import TagFilter from "components/common/filters/tags/tag/TagFilter";
import InlineTaskTypeFilter from "components/common/filters/tasks/type/InlineTaskTypeFilter";
import TaskTable from "components/tasks/TaskTable";
import NewTaskOverlay from "components/tasks/NewTaskOverlay";
import TaskCardView from "components/tasks/TaskCardView";
import TaskTypeFilter from "components/common/filters/tasks/type/TaskTypeFilter";
import TaskStatusFilter from "components/common/filters/tasks/status/TaskStatusFilter";
import TaskVerticalTabContainer from "components/tasks/TaskVerticalTabContainer";
import TabAndViewContainer from "components/common/tabs/tree/TabAndViewContainer";
import TaskRoleHelper from "@opsera/know-your-role/roles/tasks/taskRole.helper";
import useComponentStateReference from "hooks/useComponentStateReference";
import tasksMetadata from "@opsera/definitions/constants/tasks/tasks.metadata";
import PaginationContainer from "components/common/pagination/PaginationContainer";
import SideBySideViewBase from "components/common/tabs/SideBySideViewBase";

function TaskViews({taskFilterModel, setTaskFilterModel, isLoading, loadData, taskData}) {
  const {
    toastContext,
    userData,
  } = useComponentStateReference();

  const createNewTask = () => {
    toastContext.showOverlayPanel(
      <NewTaskOverlay
        loadData={loadData}
      />
    );
  };

  const getDropdownFilters = () => {
    return(
      <>
        <TaskTypeFilter
          filterModel={taskFilterModel}
          setFilterModel={setTaskFilterModel}
          className={"mb-2"}
        />
        <TaskStatusFilter
          className={"mb-2"}
          filterModel={taskFilterModel}
          setFilterModel={setTaskFilterModel}
        />
        <ActiveFilter
          filterDto={taskFilterModel}
          setFilterDto={setTaskFilterModel}
          className="mb-2"
          fieldName={"active"}
        />
        <TagFilter
          filterDto={taskFilterModel}
          setFilterDto={setTaskFilterModel}
        />
      </>
    );
  };

  const getInlineFilters = () => {
    return (
      <InlineTaskTypeFilter
        filterModel={taskFilterModel}
        setFilterModel={setTaskFilterModel}
        className={"mr-2"}
        loadData={loadData}
      />
    );
  };

  const getCardView = () => {
    return (
      <TaskCardView
        isLoading={isLoading}
        loadData={loadData}
        taskData={taskData}
      />
    );
  };

  const getTableView = () => {
    return (
      <TaskTable
        isLoading={isLoading}
        loadData={loadData}
        taskData={taskData}
      />
    );
  };

  const getVerticalTabContainer = () => {
    return (
      <TaskVerticalTabContainer
        isLoading={isLoading}
        loadData={loadData}
        taskFilterModel={taskFilterModel}
      />
    );
  };

  const getCurrentView = () => {
    return (
      <TableCardView
        data={taskData}
        isLoading={isLoading}
        cardView={getCardView()}
        tableView={getTableView()}
      />
    );
  };

  const getTableCardView = () => {
    return (
      <PaginationContainer
        loadData={loadData}
        isLoading={isLoading}
        filterDto={taskFilterModel}
        setFilterDto={setTaskFilterModel}
        data={taskData}
        nextGeneration={true}
      >
        <SideBySideViewBase
          leftSideView={getVerticalTabContainer()}
          rightSideView={getCurrentView()}
          leftSideMinimumWidth={"175px"}
          leftSideMaximumWidth={"175px"}
        />
      </PaginationContainer>
    );
  };

  return (
      <FilterContainer
        loadData={loadData}
        filterDto={taskFilterModel}
        setFilterDto={setTaskFilterModel}
        addRecordFunction={TaskRoleHelper.canCreateTask(userData) === true ? createNewTask : undefined}
        supportSearch={true}
        supportViewToggle={true}
        isLoading={isLoading}
        metadata={tasksMetadata}
        body={getTableCardView()}
        dropdownFilters={getDropdownFilters()}
        inlineFilters={getInlineFilters()}
        titleIcon={faTasks}
        title={"Tasks"}
        type={"Task"}
        className={"px-2 pb-2"}
      />
  );
}

TaskViews.propTypes = {
  taskData: PropTypes.array,
  isLoading: PropTypes.bool,
  taskFilterModel: PropTypes.object,
  setTaskFilterModel: PropTypes.func,
  loadData: PropTypes.func,
};

export default TaskViews;