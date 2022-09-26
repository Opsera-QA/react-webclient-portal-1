import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import ActionBarDeleteButtonBase from "components/common/actions/buttons/ActionBarDeleteButtonBase";
import DeleteTaskConfirmationOverlay from "components/tasks/buttons/DeleteTaskConfirmationOverlay";
import TaskRoleHelper from "@opsera/know-your-role/roles/tasks/taskRole.helper";

// TODO: use role definitions
export default function ActionBarDeleteTaskButton(
  {
    visible,
    taskModel,
    className,
    refreshAfterDeletion,
  }) {
  const {
    accessRoleData,
    toastContext,
    userData,
  } = useComponentStateReference();
  const [canDelete, setCanDelete] = useState(false);

  useEffect(() => {
    setCanDelete(false);

    if (taskModel != null && accessRoleData != null) {
      // TODO: Wire up through the model when ready
      // TODO: Make admin delete one
      if (taskModel?.getData("type") === "sfdc-cert-gen") {
        setCanDelete(TaskRoleHelper.canDeleteTask(userData, taskModel?.getPersistData()));
      } else {
        setCanDelete(TaskRoleHelper.canDeleteTask(userData, taskModel?.getPersistData()));
      }
    }
  }, [accessRoleData, taskModel]);

  const showDeleteConfirmationOverlay = () => {
    toastContext.showOverlayPanel(
      <DeleteTaskConfirmationOverlay
        taskModel={taskModel}
        refreshAfterDeletion={refreshAfterDeletion}
      />
    );
  };

  if (visible === false || canDelete !== true || taskModel == null) {
    return null;
  }

  return (
    <ActionBarDeleteButtonBase
      handleDeleteFunction={showDeleteConfirmationOverlay}
      type={"Task"}
      className={className}
    />
  );
}

ActionBarDeleteTaskButton.propTypes = {
  taskModel: PropTypes.object,
  className: PropTypes.string,
  visible: PropTypes.bool,
  refreshAfterDeletion: PropTypes.bool,
};