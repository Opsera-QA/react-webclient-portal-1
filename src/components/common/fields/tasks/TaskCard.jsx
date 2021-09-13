import React from "react";
import PropTypes from "prop-types";
import IconCardContainerBase from "components/common/card_containers/IconCardContainerBase";
import IconTitleBar from "components/common/fields/title/IconTitleBar";
import DescriptionField from "components/common/fields/text/DescriptionField";
import CreateAndUpdateDateFieldBase from "components/common/fields/date/CreateAndUpdateDateFieldBase";
import {getLargeVendorIconFromTaskType} from "components/common/helpers/icon-helpers";
import TaskLinkButton from "components/common/buttons/task/TaskLinkButton";

function TaskCard({ taskData, isLoading, loadTaskInNewWindow }) {
  const getTitleBar = () => {
    let icon = getLargeVendorIconFromTaskType(taskData?.getData("type"));

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
        title={`${taskData.getData("name")}`}
        isLoading={isLoading}
      />
    );
  };


  const getDescription = () => {
    return (
      <div className="description-height small pl-1">
      <DescriptionField dataObject={taskData} fieldName={"description"} />
    </div>
    );
  };

  if (isLoading) {
    return <IconCardContainerBase titleBar={getTitleBar()} isLoading={isLoading} />;
  }

  return (
    <IconCardContainerBase titleBar={getTitleBar()} contentBody={getDescription()} isLoading={isLoading} className={"tool-registry-card"}>
      <div className="date-and-button">
        <div className="small pl-1">
          <CreateAndUpdateDateFieldBase className={"mt-3 mb-1"} model={taskData} />
        </div>
        <div>
          <TaskLinkButton
            taskId={taskData?.getData("_id")}
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
  taskData: PropTypes.object,
  isLoading: PropTypes.bool,
  loadTaskInNewWindow: PropTypes.bool
};

export default TaskCard;
