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
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {faAws, faMicrosoft, faSalesforce} from "@fortawesome/free-brands-svg-icons";
import {faGitAlt} from "@fortawesome/free-brands-svg-icons/faGitAlt";

function TaskViews({taskFilterModel, setTaskFilterModel, isLoading, loadData, taskData, isMounted, taskMetadata}) {
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
        taskMetadata={taskMetadata}
        taskFilterModel={taskFilterModel}
        setTaskFilterModel={setTaskFilterModel}
      />
    );
  };

  const getTaskTypeTabs = () => {
    return (
      <VanitySetVerticalTabContainer className={"h-100"}>
        <VanitySetVerticalTab
          icon={faTasks}
          tabText={"All"}
          tabName={""}
          onSelect={onSelect}
          activeTab={taskFilterModel?.getData("category")}
        />
        <VanitySetVerticalTab
          icon={faAws}
          tabText={"AWS"}
          tabName={"aws"}
          onSelect={onSelect}
          activeTab={taskFilterModel?.getData("category")}
        />
        <VanitySetVerticalTab
          icon={faMicrosoft}
          tabText={"Azure"}
          tabName={"azure"}
          onSelect={onSelect}
          activeTab={taskFilterModel?.getData("category")}
        />
        <VanitySetVerticalTab
          icon={faGitAlt}
          tabText={"Git"}
          tabName={"git"}
          onSelect={onSelect}
          activeTab={taskFilterModel?.getData("category")}
        />
        <VanitySetVerticalTab
          icon={faSalesforce}
          tabText={"Salesforce"}
          tabName={"salesforce"}
          onSelect={onSelect}
          activeTab={taskFilterModel?.getData("category")}
        />
      </VanitySetVerticalTabContainer>
    );
  };

  const onSelect = (tab) => {
    taskFilterModel?.setData("category", tab);
    taskFilterModel?.setData("type", "");
    loadData(taskFilterModel);
  };

  const getTableCardView = () => {
    return (
      <Row className={"mx-0"}>
        <Col sm={2} className={"px-0"}>
          {getTaskTypeTabs()}
        </Col>
        <Col sm={10} className={"px-0"}>
          <TableCardView
            filterDto={taskFilterModel}
            data={taskData}
            isLoading={isLoading}
            loadData={loadData}
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