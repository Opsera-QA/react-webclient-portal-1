import React, { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import axios from "axios";
import { scheduledTaskActions } from "components/common/fields/scheduler/scheduledTask.actions";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import PropTypes from "prop-types";
import LogsBackupScheduledTasksTable from "components/settings/logs_backup/LogsBackupScheduledTasksTable";

function LogsBackupManagementTableLoader({ s3ToolId }) {
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
      loadData(source).catch((error) => {
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
      await loadScheduledTasks(cancelSource);
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

  const loadScheduledTasks = async (cancelSource = cancelTokenSource) => {
    const response = await scheduledTaskActions.getScheduledLogPush(getAccessToken, cancelSource, s3ToolId);
    const newScheduledTasksList = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(newScheduledTasksList)) {
      setScheduledTasks([...newScheduledTasksList]);
    }
  };

  return (
    <LogsBackupScheduledTasksTable
      isLoading={isLoading}
      scheduledTasks={scheduledTasks}
      loadDataFunction={loadData}
      isMounted={isMounted}
    />
  );
}

LogsBackupManagementTableLoader.propTypes = {
  s3ToolId: PropTypes.string,
};

export default LogsBackupManagementTableLoader;