import React from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import TaskCard from "components/common/fields/tasks/TaskCard";
import VanitySetCardView from "components/common/card/VanitySetCardView";
import VerticalCardViewBase from "components/common/card_view/VerticalCardViewBase";
import tasksMetadata from "@opsera/definitions/constants/tasks/tasks.metadata";

function TaskCardView({ taskData, taskFilterModel, loadData, isLoading }) {
  const getTaskCard = (task) => {
    return (
      <TaskCard
        taskModel={new Model({...task}, tasksMetadata, false)}
      />
    );
  };

  return (
    <VanitySetCardView
      isLoading={isLoading}
      loadData={loadData}
      paginationModel={taskFilterModel}
      className={"makeup-container-table m-2"}
      cards={
        <VerticalCardViewBase
          getCardFunction={getTaskCard}
          data={taskData}
        />
      }
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