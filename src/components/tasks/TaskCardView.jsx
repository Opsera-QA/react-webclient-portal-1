import React from "react";
import PropTypes from "prop-types";
import {Col} from "react-bootstrap";
import Model from "core/data_model/model";
import Row from "react-bootstrap/Row";
import CardView from "components/common/card/CardView";
import TaskCard from "components/common/fields/tasks/TaskCard";
import gitTasksMetadata from "components/tasks/git-tasks-metadata";

function TaskCardView({ taskData, taskFilterModel, setTaskFilterModel, loadData, isLoading }) {
  const getCards = () => {
    if (!Array.isArray(taskData) || taskData.length === 0) {
      return null;
    }

    return (
      <Row className={"mx-0"}>
        {taskData.map((task, index) => (
          <Col key={index} className={"mb-2"}>
            <TaskCard taskModel={new Model({ ...task }, gitTasksMetadata, false)}/>
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <CardView
      isLoading={isLoading}
      loadData={loadData}
      setPaginationDto={setTaskFilterModel}
      paginationDto={taskFilterModel}
      className={"makeup-container-table"}
      cards={getCards()}
    />
  );
}

TaskCardView.propTypes = {
  taskData: PropTypes.array,
  taskFilterModel: PropTypes.object,
  setTaskFilterModel: PropTypes.func,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};

export default TaskCardView;