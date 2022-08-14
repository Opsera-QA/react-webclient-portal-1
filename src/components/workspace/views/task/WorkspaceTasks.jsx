import React, {useEffect, useState} from 'react';
import taskActions from "components/tasks/task.actions";
import LoadingDialog from "components/common/status_notifications/loading";
import useComponentStateReference from "hooks/useComponentStateReference";
import WorkspaceTaskViews from "components/workspace/views/task/WorkspaceTaskViews";
import PropTypes from "prop-types";

export default function WorkspaceTasks(
  {
    workspaceFilterModel,
    setWorkspaceFilterModel,
  }) {
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [taskMetadata, setTaskMetadata] = useState(undefined);
  const {
    isMounted,
    getAccessToken,
    cancelTokenSource,
    accessRoleData,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    if (accessRoleData) {
      loadData().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getTasksList();
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getTasksList = async () => {
    const tableFields = ["name", "description", "type", "tags", "createdAt", "updatedAt", "active", "status", "run_count"];
    const response = await taskActions.getWorkspaceTasksList(getAccessToken, cancelTokenSource, tableFields);
    const taskList = response?.data?.data;
    const taskMetadata = response?.data?.metadata;

    if (isMounted.current === true && Array.isArray(taskList)) {
      setTasks(taskList);
      setTaskMetadata(taskMetadata);
    }
  };

  if (!accessRoleData) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <WorkspaceTaskViews
      tasks={tasks}
      loadData={loadData}
      isLoading={isLoading}
      isMounted={isMounted}
      taskMetadata={taskMetadata}
      workspaceFilterModel={workspaceFilterModel}
      setWorkspaceFilterModel={setWorkspaceFilterModel}
    />
  );
}

WorkspaceTasks.propTypes = {
  workspaceFilterModel: PropTypes.object,
  setWorkspaceFilterModel: PropTypes.func,
};