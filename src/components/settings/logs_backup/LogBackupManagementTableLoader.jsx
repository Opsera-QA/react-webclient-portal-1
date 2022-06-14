import React, { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import axios from "axios";
import { scheduledTaskActions } from "components/common/fields/scheduler/scheduledTask.actions";
import { scheduledTaskMetadata } from "components/common/fields/scheduler/scheduledTask.metadata";
import ScheduledTasksTable from "components/common/fields/scheduler/ScheduledTasksTable";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import modelHelpers from "components/common/model/modelHelpers";

function LogsBackupManagementTableLoader(s3ToolId, setScheduledTaskModel) {
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [scheduledTasks, setScheduledTasks] = useState([]);
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    setScheduledTasks([]);
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if (isMongoDbId(s3ToolId) === true) {
      loadData(cancelTokenSource).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [s3ToolId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadScheduledTasks(cancelSource, getAccessToken);
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

  const loadScheduledTasks = async (cancelSource = cancelTokenSource, getAccessToken) => {
    const response = await scheduledTaskActions.getScheduledLogPush(getAccessToken, cancelSource, s3ToolId);
    const newScheduledTasksList = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(newScheduledTasksList)) {
      setScheduledTasks([...newScheduledTasksList]);
    }
  };

  // TODO: If this is just a copy of the main model, we could just use that as the base.
  //  IE: const newModel = modelHelpers.parseObjectIntoModel(setScheduledTaskModel?.getPersistData(), scheduledTaskMetadata);
  const createScheduledTaskFunction = () => {
    const newModel = modelHelpers.parseObjectIntoModel(undefined, scheduledTaskMetadata);
    const task = {
      taskType: "pipeline-log-s3-push",
      s3ToolId: s3ToolId
    };
    newModel.setData("task", task);
    setScheduledTaskModel({ ...newModel });
  };

  return (
    <ScheduledTasksTable
      isLoading={isLoading}
      scheduledTasks={scheduledTasks}
      loadDataFunction={loadData}
      setScheduledTaskModel={setScheduledTaskModel}
      isMounted={isMounted}
      createScheduledTaskFunction={createScheduledTaskFunction}
    />
  );
}


export default LogsBackupManagementTableLoader;