import React from "react";
import PropTypes from "prop-types";
import {Col} from "react-bootstrap";
import Model from "core/data_model/model";
import Row from "react-bootstrap/Row";
import TaskCard from "components/common/fields/tasks/TaskCard";
import VanitySetCardView from "components/common/card/VanitySetCardView";

function TaskCardView({ taskData, taskFilterModel, loadData, isLoading, taskMetadata }) {
  const getCards = () => {
    if (!Array.isArray(taskData) || taskData.length === 0 || taskMetadata == null) {
      return null;
    }

    return (
      <Row className={"mx-0 my-2"}>
        {taskData.map((task, index) => (
          <Col key={index} className={"my-2"}>
            <TaskCard taskModel={new Model({ ...task }, taskMetadata, false)}/>
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <VanitySetCardView
      isLoading={isLoading}
      loadData={loadData}
      paginationModel={taskFilterModel}
      className={"makeup-container-table"}
      cards={getCards()}
    />
  );
}

TaskCardView.propTypes = {
  taskData: PropTypes.array,
  taskFilterModel: PropTypes.object,
  taskMetadata: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};

export default TaskCardView;