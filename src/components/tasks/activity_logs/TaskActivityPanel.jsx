import React, {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "contexts/AuthContext";
import PropTypes from "prop-types";
import axios from "axios";
import taskActivityLogHelpers
  from "components/tasks/activity_logs/taskActivityLog.helpers";
import {DialogToastContext} from "contexts/DialogToastContext";
import TaskActivityLogTreeTable from "components/tasks/details/TaskActivityLogTreeTable";
import {TaskActivityLogFilterModel} from "components/tasks/activity_logs/taskActivityLog.filter.model";
import {taskActivityLogActions} from "components/tasks/activity_logs/taskActivityLog.actions";
import CustomTable from "components/common/table/CustomTable";

function TaskActivityPanel({ taskModel }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [taskActivityFilterModel, setTaskActivityFilterModel] = useState(undefined);
  const [taskActivityMetadata, setTaskActivityMetadata] = useState(undefined);
  const [activityData, setActivityData] = useState([]);
  const taskLogsTree = useRef([]);
  const [currentRunNumber, setCurrentRunNumber] = useState(undefined);
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
    setTaskActivityFilterModel(newFilterModel);

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [taskModel]);

  useEffect(() => {
    setActivityData([]);

    if (currentRunNumber) {
      pullLogs().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }
  }, [currentRunNumber]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setActivityData([]);
      const taskTree = taskActivityLogHelpers.constructRunCountTree(taskModel?.getPersistData());

      if (Array.isArray(taskTree)) {
        taskLogsTree.current = taskTree;
      }
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

  const pullLogs = async (newFilterModel = taskActivityFilterModel, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);

      if (currentRunNumber === "latest") {
        await getLatestActivityLogs(newFilterModel, cancelSource);
      } else if (currentRunNumber === "secondary") {
        await getSecondaryActivityLogs(newFilterModel, cancelSource);
      } else if (currentRunNumber) {
        await getSingleRunLogs(newFilterModel, cancelSource);
      }

    } catch (error) {
      if (isMounted.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getSecondaryActivityLogs = async (newFilterModel = taskActivityFilterModel, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      const response = await taskActivityLogActions.getSecondaryTaskActivityLogs(getAccessToken, cancelSource, newFilterModel, taskModel?.getData("_id"));
      const taskActivityData = response?.data?.data;

      if (Array.isArray(taskActivityData)) {
        setActivityData([...taskActivityData]);
        setTaskActivityMetadata(response?.data?.metadata);
        newFilterModel?.setData("totalCount", response?.data?.count);
        newFilterModel?.setData("activeFilters", newFilterModel?.getActiveFilters());
        setTaskActivityFilterModel({...newFilterModel});
      }
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

  const getLatestActivityLogs = async (newFilterModel = taskActivityFilterModel, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      const response = await taskActivityLogActions.getLatestTaskActivityLogs(getAccessToken, cancelSource, newFilterModel, taskModel?.getData("_id"));
      const taskActivityData = response?.data?.data;

      if (Array.isArray(taskActivityData)) {
        setActivityData([...taskActivityData]);
        setTaskActivityMetadata(response?.data?.metadata);
        newFilterModel?.setData("totalCount", response?.data?.count);
        newFilterModel?.setData("activeFilters", newFilterModel?.getActiveFilters());
        setTaskActivityFilterModel({...newFilterModel});
      }
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

  const getSingleRunLogs = async (newFilterModel = taskActivityFilterModel, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      const response = await taskActivityLogActions.getTaskActivityLogsByIdAndRunCount(getAccessToken, cancelSource, taskModel?.getData("_id"), currentRunNumber, newFilterModel);
      const taskActivityData = response?.data?.data;

      if (Array.isArray(taskActivityData)) {
        setActivityData([...taskActivityData]);
        setTaskActivityMetadata(response?.data?.metadata);
        newFilterModel?.setData("totalCount", response?.data?.count);
        newFilterModel?.setData("activeFilters", newFilterModel?.getActiveFilters());
        setTaskActivityFilterModel({...newFilterModel});
      }
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  if (taskModel == null) {
    return null;
  }

  return (
    <TaskActivityLogTreeTable
      taskLogData={activityData}
      isLoading={isLoading}
      loadData={pullLogs}
      taskActivityFilterModel={taskActivityFilterModel}
      setTaskActivityFilterModel={setTaskActivityFilterModel}
      taskActivityMetadata={taskActivityMetadata}
      taskActivityTreeData={taskLogsTree?.current}
      setCurrentRunNumber={setCurrentRunNumber}
      currentRunNumber={currentRunNumber}
      taskRunCount={taskModel?.getData("run_count")}
    />
  );
}

TaskActivityPanel.propTypes = {
  taskModel: PropTypes.object,
};

export default TaskActivityPanel;

