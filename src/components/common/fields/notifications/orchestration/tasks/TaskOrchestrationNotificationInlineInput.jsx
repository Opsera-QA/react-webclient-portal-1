import React, { useContext } from "react";
import PropTypes from "prop-types";
import OrchestrationNotificationInlineInputBase
  from "components/common/fields/notifications/orchestration/OrchestrationNotificationInlineInputBase";
import TaskNotificationConfigurationOverlay
  from "components/tasks/details/tasks/notifications/TaskNotificationConfigurationOverlay";
import { DialogToastContext } from "contexts/DialogToastContext";

function TaskOrchestrationNotificationInlineInput(
  {
    model,
    fieldName,
    disabled,
    visible,
    loadDataFunction,
    noDataMessage,
    helpComponent,
  }) {
  const toastContext = useContext(DialogToastContext);

  const launchOverlayFunction = async () => {
    toastContext.showOverlayPanel(
      <TaskNotificationConfigurationOverlay
        taskId={model?.getMongoDbId()}
        task={model}
        loadDataFunction={loadDataFunction}
      />
    );
  };

  if (visible === false || model == null) {
    return null;
  }

  return (
    <OrchestrationNotificationInlineInputBase
      model={model}
      fieldName={fieldName}
      disabled={disabled}
      visible={visible}
      helpComponent={helpComponent}
      launchOverlayFunction={launchOverlayFunction}
      noDataMessage={noDataMessage}
    />
  );
}

TaskOrchestrationNotificationInlineInput.propTypes = {
  helpComponent: PropTypes.object,
  fieldName: PropTypes.string,
  model: PropTypes.object,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  noDataMessage: PropTypes.any,
  loadDataFunction: PropTypes.func,
};

TaskOrchestrationNotificationInlineInput.defaultProps = {
  fieldName: "notifications",
};

export default TaskOrchestrationNotificationInlineInput;