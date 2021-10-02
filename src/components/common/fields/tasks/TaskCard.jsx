import React from "react";
import PropTypes from "prop-types";
import IconCardContainerBase from "components/common/card_containers/IconCardContainerBase";
import IconTitleBar from "components/common/fields/title/IconTitleBar";
import DescriptionField from "components/common/fields/text/DescriptionField";
import CreateAndUpdateDateFieldBase from "components/common/fields/date/CreateAndUpdateDateFieldBase";
import {getLargeVendorIconComponentFromTaskType} from "components/common/helpers/icon-helpers";
import TaskLinkButton from "components/common/buttons/task/TaskLinkButton";
import TaskTypeField from "components/common/fields/tasks/TaskTypeField";

function TaskCard({ taskModel, isLoading, loadTaskInNewWindow }) {
  const getTitleBar = () => {
    let icon = getLargeVendorIconComponentFromTaskType(taskModel?.getData("type"));

    if (typeof icon === "string") {
      icon = (
        <div className="d-flex w-100 h-100 mt-2 mb-4">
          <div className="my-auto tool-title-text">{icon}</div>
        </div>
      );
    }

    return (
      <IconTitleBar
        icon={icon}
        title={`${taskModel?.getData("name")}`}
        isLoading={isLoading}
      />
    );
  };


  const getDescription = () => {
    return (
      <div className="description-height small pl-1">
      <DescriptionField dataObject={taskModel} fieldName={"description"} />
    </div>
    );
  };

  if (isLoading) {
    return <IconCardContainerBase titleBar={getTitleBar()} isLoading={isLoading} />;
  }

  return (
    <IconCardContainerBase
      titleBar={getTitleBar()}
      contentBody={getDescription()}
      isLoading={isLoading}
      className={"vertical-selection-card"}
    >
      <div className="date-and-button">
        <div className="small pl-1">
          <TaskTypeField model={taskModel} fieldName={"type"} showLabel={false} />
          <CreateAndUpdateDateFieldBase className={"mt-3 mb-1"} model={taskModel} />
        </div>
        <div>
          <TaskLinkButton
            taskId={taskModel?.getData("_id")}
            className={"w-100 mt-1"}
            openInNewWindow={loadTaskInNewWindow}
            variant={"primary"}
          />
        </div>
      </div>
    </IconCardContainerBase>
  );
}

TaskCard.propTypes = {
  taskModel: PropTypes.object,
  isLoading: PropTypes.bool,
  loadTaskInNewWindow: PropTypes.bool
};

export default TaskCard;
