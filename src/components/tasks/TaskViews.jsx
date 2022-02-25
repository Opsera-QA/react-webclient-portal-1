import React, {useContext} from "react";
import TableCardView from "components/common/table/TableCardView";
import ActiveFilter from "components/common/filters/status/ActiveFilter";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import {faTasks} from "@fortawesome/pro-light-svg-icons";
import TagFilter from "components/common/filters/tags/tag/TagFilter";
import {DialogToastContext} from "contexts/DialogToastContext";
import InlineTaskTypeFilter from "components/common/filters/tasks/type/InlineTaskTypeFilter";
import TaskTable from "components/tasks/TaskTable";
import NewTaskOverlay from "components/tasks/NewTaskOverlay";
import TaskCardView from "components/tasks/TaskCardView";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TaskTypeFilter from "components/common/filters/tasks/type/TaskTypeFilter";
import TaskStatusFilter from "components/common/filters/tasks/status/TaskStatusFilter";
import TaskVerticalTabContainer from "components/tasks/TaskVerticalTabContainer";

function TaskViews({taskFilterModel, setTaskFilterModel, isLoading, loadData, taskData, isMounted, taskMetadata}) {
  const toastContext = useContext(DialogToastContext);

  const createNewTask = () => {
    toastContext.showOverlayPanel(<NewTaskOverlay loadData={loadData} isMounted={isMounted} />);
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
        taskMetadata={taskMetadata}
        isLoading={isLoading}
        loadData={loadData}
        taskData={taskData}
        taskFilterModel={taskFilterModel}
      />
    );
  };

  const getTableView = () => {
    return (
      <TaskTable
        isLoading={isLoading}
        loadData={loadData}
        taskData={taskData}
        taskMetadata={taskMetadata}
        taskFilterModel={taskFilterModel}
        setTaskFilterModel={setTaskFilterModel}
      />
    );
  };


  const getTableCardView = () => {
    return (
      <Row className={"mx-0"}>
        <Col sm={2} className={"px-0"}>
          <TaskVerticalTabContainer
            isLoading={isLoading}
            loadData={loadData}
            taskFilterModel={taskFilterModel}
          />
        </Col>
        <Col sm={10} className={"px-0"}>
          <TableCardView
            filterModel={taskFilterModel}
            data={taskData}
            isLoading={isLoading}
            cardView={getCardView()}
            tableView={getTableView()}
          />
        </Col>
      </Row>
    );
  };

  return (
      <FilterContainer
        loadData={loadData}
        filterDto={taskFilterModel}
        setFilterDto={setTaskFilterModel}
        addRecordFunction={createNewTask}
        supportSearch={true}
        supportViewToggle={true}
        isLoading={isLoading}
        metadata={taskMetadata}
        body={getTableCardView()}
        dropdownFilters={getDropdownFilters()}
        inlineFilters={getInlineFilters()}
        titleIcon={faTasks}
        title={"Tasks"}
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
  isMounted: PropTypes.object,
  taskMetadata: PropTypes.object,
};

export default TaskViews;