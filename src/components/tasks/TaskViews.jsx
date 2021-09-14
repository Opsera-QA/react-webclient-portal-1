import React, {useContext} from "react";
import TableCardView from "components/common/table/TableCardView";
import StatusFilter from "components/common/filters/status/StatusFilter";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import {faTasks} from "@fortawesome/pro-light-svg-icons";
import TagFilter from "components/common/filters/tags/tag/TagFilter";
import {DialogToastContext} from "contexts/DialogToastContext";
import InlineTaskTypeFilter from "components/common/filters/tasks/type/InlineTaskTypeFilter";
import TaskTable from "components/tasks/TaskTable";
import NewTaskOverlay from "components/tasks/NewTaskOverlay";
import TaskCardView from "components/tasks/TaskCardView";
import gitTasksMetadata from "components/tasks/git-tasks-metadata";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  getLargeVendorIconComponentFromTaskType,
} from "components/common/helpers/icon-helpers";
import {TASK_TYPES} from "components/tasks/task.types";

function TaskViews({taskFilterModel, setTaskFilterModel, isLoading, loadData, taskData, saveCookies, customerAccessRules, isMounted}) {
  const toastContext = useContext(DialogToastContext);

  const createNewTask = () => {
    toastContext.showOverlayPanel(<NewTaskOverlay loadData={loadData} isMounted={isMounted} />);
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
      <TaskTable
        isLoading={isLoading}
        loadData={loadData}
        taskData={taskData}
        gitTasksFilterDto={taskFilterModel}
        setGitTasksFilterDto={setTaskFilterModel}
      />
    );
  };

  const getTaskTypeTabs = () => {
    return (
      <VanitySetVerticalTabContainer className={"h-100"} title={"Task Types"}>
        <VanitySetVerticalTab
          iconComponent={getLargeVendorIconComponentFromTaskType("default")}
          tabText={"All"}
          tabName={""}
          onSelect={onSelect}
        />
        <VanitySetVerticalTab
          iconComponent={getLargeVendorIconComponentFromTaskType(TASK_TYPES.AWS_CREATE_ECS_CLUSTER)}
          tabText={"AWS"}
          tabName={"aws"}
          onSelect={onSelect}
        />
        <VanitySetVerticalTab
          iconComponent={getLargeVendorIconComponentFromTaskType(TASK_TYPES.AZURE_CLUSTER_CREATION)}
          tabText={"Azure"}
          tabName={"azure"}
          onSelect={onSelect}
        />
        <VanitySetVerticalTab
          iconComponent={getLargeVendorIconComponentFromTaskType(TASK_TYPES.SYNC_GIT_BRANCHES)}
          tabText={"Git"}
          tabName={"git"}
          onSelect={onSelect}
        />
        <VanitySetVerticalTab
          iconComponent={getLargeVendorIconComponentFromTaskType(TASK_TYPES.SALESFORCE_CERTIFICATE_GENERATION)}
          tabText={"Salesforce"}
          tabName={"salesforce"}
          onSelect={onSelect}
        />
      </VanitySetVerticalTabContainer>
    );
  };

  const onSelect = (tab) => {
    taskFilterModel?.setData("category", tab);
    loadData(taskFilterModel);
  };

  const getTableCardView = () => {
    return (
      // <Row className={"mx-0"}>
      //   <Col sm={2} className={"px-0"}>
      //     {getTaskTypeTabs()}
      //   </Col>
      //   <Col sm={10} className={"px-0"}>
          <TableCardView
            filterDto={taskFilterModel}
            data={taskData}
            isLoading={isLoading}
            loadData={loadData}
            cardView={getCardView()}
            tableView={getTableView()}
          />
      //   </Col>
      // </Row>
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
        metadata={gitTasksMetadata}
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
  saveCookies: PropTypes.func,
  customerAccessRules: PropTypes.object,
  isMounted: PropTypes.object
};

export default TaskViews;