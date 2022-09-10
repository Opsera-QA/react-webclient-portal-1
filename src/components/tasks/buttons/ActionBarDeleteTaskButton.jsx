import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import workflowAuthorizedActions
  from "components/workflow/pipelines/pipeline_details/workflow/workflow-authorized-actions";
import ActionBarDeleteButtonBase from "components/common/actions/buttons/ActionBarDeleteButtonBase";
import DeleteTaskConfirmationOverlay from "components/tasks/buttons/DeleteTaskConfirmationOverlay";

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
  } = useComponentStateReference();
  const [canDelete, setCanDelete] = useState(false);

  useEffect(() => {
    setCanDelete(false);

    if (taskModel != null && accessRoleData != null) {
      setCanDelete(
        workflowAuthorizedActions.gitItems(
          accessRoleData,
          taskModel?.getData("type") === "sfdc-cert-gen" ? "delete_admin_task" : "delete_task",
          taskModel?.getData("owner"),
          taskModel?.getData("roles"),
        )
      );
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