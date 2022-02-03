import React, {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "contexts/AuthContext";
import AllTasksActivityLogs
  from "components/tasks/activity_logs/all_tasks/AllTasksActivityLogs";
import axios from "axios";
import taskActivityLogHelpers
  from "components/tasks/activity_logs/taskActivityLog.helpers";
import {DialogToastContext} from "contexts/DialogToastContext";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import TasksSubNavigationBar from "components/tasks/TasksSubNavigationBar";
import taskActions from "components/tasks/task.actions";
import {TaskActivityFilterModel} from "components/tasks/activity_logs/task-activity.filter.model";
import {taskActivityLogActions} from "components/tasks/activity_logs/taskActivityLog.actions";

function TaskAllActivityPanel() {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [taskActivityFilterModel, setTaskActivityFilterModel] = useState(undefined);
  const [taskActivityMetadata, setTaskActivityMetadata] = useState(undefined);
  const [activityData, setActivityData] = useState([]);
  const taskLogsTree = useRef([]);
  const [currentRunNumber, setCurrentRunNumber] = useState(undefined);
  const [currentTaskId, setCurrentTaskId] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    let newFilterModel = new TaskActivityFilterModel(getAccessToken, source, loadData);
    loadData(newFilterModel, false, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setActivityData([]);

    console.log(currentRunNumber);
    console.log(currentTaskId);
    if (currentTaskId) {
      pullLogs().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }
  }, [currentRunNumber]);

  const loadData = async (newFilterModel = taskActivityFilterModel, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      setActivityData([]);
      const fields = ["name", "run_count"];
      const response = await taskActions.getTasksListV2(getAccessToken, cancelSource, newFilterModel, fields);
      const tasks = response?.data?.data;

      const taskTree = taskActivityLogHelpers.constructTopLevelTreeBasedOnNameAndRunCount(tasks);

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

      if (currentTaskId === "latest") {
        await getLatestActivityLogs(newFilterModel, cancelSource);
      } else if (currentTaskId === "secondary") {
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
      const response = await taskActivityLogActions.getSecondaryTaskActivityLogs(getAccessToken, cancelSource);
      const taskActivityData = response?.data?.data;

      if (Array.isArray(taskActivityData)) {
        setActivityData([...taskActivityData]);
        setTaskActivityMetadata(response?.data?.metadata);
        // newFilterModel?.setData("totalCount", response?.data?.count);
        // newFilterModel?.setData("activeFilters", newFilterModel?.getActiveFilters());
        // setTaskActivityFilterModel({...newFilterModel});
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
      const response = await taskActivityLogActions.getLatestTaskActivityLogs(getAccessToken, cancelSource, newFilterModel);
      const taskActivityData = response?.data?.data;

      if (Array.isArray(taskActivityData)) {
        setActivityData([...taskActivityData]);
        setTaskActivityMetadata(response?.data?.metadata);
        // newFilterModel?.setData("totalCount", response?.data?.count);
        // newFilterModel?.setData("activeFilters", newFilterModel?.getActiveFilters());
        // setTaskActivityFilterModel({...newFilterModel});
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
      const response = await taskActivityLogActions.getTaskActivityLogsByIdAndRunCount(getAccessToken, cancelSource, currentTaskId, currentRunNumber, newFilterModel);
      const taskActivityData = response?.data?.data;

      if (Array.isArray(taskActivityData)) {
        setActivityData([...taskActivityData]);
        setTaskActivityMetadata(response?.data?.metadata);
        // newFilterModel?.setData("totalCount", response?.data?.count);
        // newFilterModel?.setData("activeFilters", newFilterModel?.getActiveFilters());
        // setTaskActivityFilterModel({...newFilterModel});
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

  return (
    <ScreenContainer
      breadcrumbDestination={"taskActivityLogs"}
      pageDescription={`
        View Opsera Task logs.
      `}
      navigationTabContainer={<TasksSubNavigationBar currentTab={"activity"}/>}
    >
      <AllTasksActivityLogs
        taskLogData={activityData}
        isLoading={isLoading}
        loadData={pullLogs}
        taskActivityFilterModel={taskActivityFilterModel}
        setTaskActivityFilterModel={setTaskActivityFilterModel}
        taskActivityMetadata={taskActivityMetadata}
        taskActivityTreeData={taskLogsTree?.current}
        setCurrentRunNumber={setCurrentRunNumber}
        setCurrentTaskId={setCurrentTaskId}
        currentRunNumber={currentRunNumber}
      />
    </ScreenContainer>
  );
}

TaskAllActivityPanel.propTypes = {

};

export default TaskAllActivityPanel;

