import React from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import VanitySetCardView from "components/common/card/VanitySetCardView";
import VerticalCardViewBase from "components/common/card_view/VerticalCardViewBase";
import tasksMetadata from "@opsera/definitions/constants/tasks/tasks.metadata";
import TaskCardBase from "temp-library-components/cards/tasks/TaskCardBase";
import {useHistory} from "react-router-dom";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {taskHelper} from "components/tasks/task.helper";

export default function TaskCardView(
  {
    taskData,
    loadData,
    isLoading,
    containerHeight,
    noDataMessage,
    error,
  }) {
  const history = useHistory();

  const loadTask = (taskModel) => {
    const taskLink = taskHelper.getModelDetailViewLink(taskModel);

    if (hasStringValue(taskLink) === true) {
      history.push(taskLink);
    }
  };

  const getTaskCard = (task) => {
    return (
      <TaskCardBase
        onClickFunction={loadTask}
        taskModel={new Model({...task}, tasksMetadata, false)}
        tooltip={"Click to view Task"}
      />
    );
  };

  return (
    <VanitySetCardView
      isLoading={isLoading}
      loadData={loadData}
      noDataMessage={noDataMessage}
      error={error}
      cards={
        <VerticalCardViewBase
          getCardFunction={getTaskCard}
          data={taskData}
          minHeight={containerHeight}
          noDataMessage={noDataMessage}
        />
      }
    />
  );
}

TaskCardView.propTypes = {
  taskData: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  containerHeight: PropTypes.string,
  noDataMessage: PropTypes.any,
  error: PropTypes.any,
};
