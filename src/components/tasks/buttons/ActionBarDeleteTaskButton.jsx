import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ActionBarDeleteButton2 from "components/common/actions/buttons/ActionBarDeleteButton2";
import taskActions from "components/tasks/task.actions";
import useComponentStateReference from "hooks/useComponentStateReference";
import workflowAuthorizedActions
  from "components/workflow/pipelines/pipeline_details/workflow/workflow-authorized-actions";

// TODO: use role definitions
export default function ActionBarDeleteTaskButton(
  {
    visible,
    taskModel,
    className,
  }) {
  const {
    getAccessToken,
    cancelTokenSource,
    isOpseraAdministrator,
    accessRoleData,
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

  const deleteGitTask = async () => {
    return await taskActions.deleteGitTaskV2(getAccessToken, cancelTokenSource, taskModel);
  };

  if (visible === false || canDelete !== true) {
    return null;
  }

  return (
    <ActionBarDeleteButton2
      relocationPath={isOpseraAdministrator === true ? "/task/" : "/"}
      handleDelete={deleteGitTask}
      dataObject={taskModel}
      visible={visible}
      className={className}
    />
  );
}

ActionBarDeleteTaskButton.propTypes = {
  taskModel: PropTypes.object,
  className: PropTypes.string,
  visible: PropTypes.bool
};