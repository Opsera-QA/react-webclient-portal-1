import React, {useContext} from "react";
import TableCardView from "components/common/table/TableCardView";
import StatusFilter from "components/common/filters/status/StatusFilter";
import PropTypes from "prop-types";
import ToolCardView from "components/inventory/tools/ToolCardView";
import FilterContainer from "components/common/table/FilterContainer";
import {faTools} from "@fortawesome/pro-light-svg-icons";
import TagFilter from "components/common/filters/tags/tag/TagFilter";
import {DialogToastContext} from "contexts/DialogToastContext";
import toolMetadata from "components/inventory/tools/tool-metadata";
import InlineTaskTypeFilter from "components/common/filters/tasks/type/InlineTaskTypeFilter";
import GitTasksTable from "components/git/GitTasksTable";
import NewGitTaskOverlay from "components/git/NewGitTaskOverlay";
import TaskCardView from "components/git/TaskCardView";

function TaskViews({taskFilterModel, setTaskFilterModel, isLoading, loadData, taskData, saveCookies, customerAccessRules, isMounted}) {
  const toastContext = useContext(DialogToastContext);

  const createNewTask = () => {
    toastContext.showOverlayPanel(<NewGitTaskOverlay loadData={loadData} isMounted={isMounted} />);
  };

  const getDropdownFilters = () => {
    return(
      <>
        <StatusFilter filterDto={taskFilterModel} setFilterDto={setTaskFilterModel} className="mb-2" />
        <TagFilter filterDto={taskFilterModel} setFilterDto={setTaskFilterModel} />
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
        taskFilterModel={taskFilterModel}
        setTaskFilterModel={setTaskFilterModel}
      />
    );
  };

  const getTableView = () => {
    return (
      <GitTasksTable
        isLoading={isLoading}
        loadData={loadData}
        taskData={taskData}
        gitTasksFilterDto={taskFilterModel}
        setGitTasksFilterDto={setTaskFilterModel}
      />
    );
  };

  const getTableCardView = () => {
    return (
      <TableCardView
        filterDto={taskFilterModel}
        data={taskData}
        isLoading={isLoading}
        loadData={loadData}
        cardView={getCardView()}
        tableView={getTableView()}
      />
    );
  };

  return (
      <FilterContainer
        loadData={loadData}
        filterDto={taskFilterModel}
        setFilterDto={setTaskFilterModel}
        addRecordFunction={createNewTask}
        supportSearch={true}
        saveCookies={saveCookies}
        // supportViewToggle={true}
        isLoading={isLoading}
        metadata={toolMetadata}
        body={getTableCardView()}
        dropdownFilters={getDropdownFilters()}
        inlineFilters={getInlineFilters()}
        titleIcon={faTools}
        title={"Tools"}
        className="px-2 pb-2"
      />
  );
}

TaskViews.propTypes = {
  taskData: PropTypes.array,
  isLoading: PropTypes.bool,
  taskFilterModel: PropTypes.object,
  setTaskFilterModel: PropTypes.func,
  createNewRecord: PropTypes.func,
  loadData: PropTypes.func,
  saveCookies: PropTypes.func,
  customerAccessRules: PropTypes.object,
  isMounted: PropTypes.object
};

export default TaskViews;