import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import { scheduledTaskActions } from "components/common/fields/scheduler/scheduledTask.actions";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import SchedulerFieldBase from "components/common/fields/scheduler/SchedulerFieldBase";
import { TASK_TYPES } from "components/tasks/task.types";
import ScheduledTaskTasksOverlay from "components/tasks/scheduler/ScheduledTaskTasksOverlay";

const SCHEDULER_SUPPORTED_TASK_TYPES = [
  // TASK_TYPES.GITSCRAPER,
];

function TaskSchedulerField(
  {
    taskModel,
    canEditTaskSchedule,
    fieldName,
  }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [taskCount, setTaskCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if (taskModel && SCHEDULER_SUPPORTED_TASK_TYPES.includes(taskModel?.getData("type"))) {
      loadData(source).catch((error) => {
        if (isMounted.current === true) {
          setError(error);
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [taskModel]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      setError(undefined);
      await getScheduledTasksCount(cancelSource);
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

  const getScheduledTasksCount = async (cancelSource = cancelTokenSource) => {
    const response = await scheduledTaskActions.getScheduledTaskTasksV2(
      getAccessToken,
      cancelSource,
      taskModel?.getMongoDbId(),
    );
    const scheduledTasks = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(scheduledTasks)) {
      setTaskCount(scheduledTasks.length);
    }
  };

  const showSchedulerOverlay = () => {
    toastContext.showOverlayPanel(
      <ScheduledTaskTasksOverlay
        taskId={taskModel?.getMongoDbId()}
        loadDataFunction={loadData}
      />
    );
  };

  if (taskModel == null || SCHEDULER_SUPPORTED_TASK_TYPES.includes(taskModel?.getData("type")) !== true) {
    return null;
  }

  return (
    <SchedulerFieldBase
      showSchedulerOverlayFunction={showSchedulerOverlay}
      scheduledTaskCount={taskCount}
      error={error}
      fieldName={fieldName}
      model={taskModel}
      canEdit={canEditTaskSchedule}
      isLoading={isLoading}
    />
  );
}

TaskSchedulerField.propTypes = {
  canEditTaskSchedule: PropTypes.bool,
  taskModel: PropTypes.object,
  fieldName: PropTypes.string,
};

TaskSchedulerField.defaultProps = {
  fieldName: "schedule",
};

export default TaskSchedulerField;