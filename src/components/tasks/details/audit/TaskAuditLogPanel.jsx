import React, {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "contexts/AuthContext";
import PropTypes from "prop-types";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import {TaskActivityLogFilterModel} from "components/tasks/activity_logs/taskActivityLog.filter.model";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import UserActivityAuditLogTable from "components/common/audit_log/UserActivityAuditLogTable";
import taskActions from "components/tasks/task.actions";

function TaskAuditLogPanel({ taskId }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [taskAuditLogFilterModel, setTaskAuditLogFilterModel] = useState(undefined);
  const [taskAuditLogs, setTaskAuditLogs] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    let newFilterModel = new TaskActivityLogFilterModel(getAccessToken, source, loadData);
    setTaskAuditLogFilterModel(newFilterModel);

    setTaskAuditLogs([]);
    if (isMongoDbId(taskId) === true) {
      loadData(newFilterModel, source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [taskId]);

  const loadData = async (newFilterModel = taskAuditLogFilterModel, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getTaskAuditLogs(newFilterModel, cancelSource);
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

  const getTaskAuditLogs = async (newFilterModel = taskAuditLogFilterModel, cancelSource = cancelTokenSource) => {
    const response = await taskActions.getTaskAuditLogsByTaskId(
      getAccessToken,
      cancelSource,
      taskId,
    );
    const taskActivityData = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(taskActivityData)) {
      setTaskAuditLogs([...taskActivityData]);
      newFilterModel?.setData("totalCount", response?.data?.count);
      newFilterModel?.setData("activeFilters", newFilterModel?.getActiveFilters());
      setTaskAuditLogFilterModel({ ...newFilterModel });
    }
  };

  if (isMongoDbId(taskId) !== true) {
    return null;
  }

  return (
    <UserActivityAuditLogTable
      taskAuditLogs={taskAuditLogs}
      isLoading={isLoading}
      loadData={loadData}
      filterModel={taskAuditLogFilterModel}
      setFilterModel={setTaskAuditLogFilterModel}
    />
  );
}

TaskAuditLogPanel.propTypes = {
  taskId: PropTypes.string,
};

export default TaskAuditLogPanel;

