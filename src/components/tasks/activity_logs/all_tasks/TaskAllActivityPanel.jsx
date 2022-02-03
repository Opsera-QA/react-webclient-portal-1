import React, {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "contexts/AuthContext";
import AllTasksActivityLogTreeTable
  from "components/tasks/activity_logs/all_tasks/AllTasksActivityLogTreeTable";
import axios from "axios";
import taskActivityLogHelpers
  from "components/tasks/activity_logs/taskActivityLog.helpers";
import {DialogToastContext} from "contexts/DialogToastContext";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import TasksSubNavigationBar from "components/tasks/TasksSubNavigationBar";
import taskActions from "components/tasks/task.actions";
import {TaskActivityFilterModel} from "components/tasks/activity_logs/task-activity.filter.model";
import {taskActivityLogActions} from "components/tasks/activity_logs/taskActivityLog.actions";
import {hasStringValue} from "components/common/helpers/string-helpers";

function TaskAllActivityPanel()
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

    setTaskActivityFilterModel(new TaskActivityFilterModel(getAccessToken, source, pullLogs));
    loadData(source).catch((error) => {
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

    if (currentRunNumber) {
      pullLogs().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }
  }, [currentRunNumber, currentTaskId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      setActivityData([]);
      const fields = ["name", "run_count"];
      const response = await taskActions.getTasksListV2(getAccessToken, cancelSource, undefined, fields);
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

      if (currentRunNumber === "latest") {
        await getLatestActivityLogs(newFilterModel, cancelSource);
      } else if (currentRunNumber === "secondary") {
        await getSecondaryActivityLogs(newFilterModel, cancelSource);
      } else if (typeof currentRunNumber === "number" && hasStringValue(currentTaskId)) {
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
    const response = await taskActivityLogActions.getSecondaryTaskActivityLogs(getAccessToken, cancelSource);
    const taskActivityData = response?.data?.data;

    if (Array.isArray(taskActivityData)) {
      setActivityData([...taskActivityData]);
      setTaskActivityMetadata(response?.data?.metadata);
      newFilterModel?.setData("totalCount", response?.data?.count);
      newFilterModel?.setData("activeFilters", newFilterModel?.getActiveFilters());
      setTaskActivityFilterModel({...newFilterModel});
    }
  };

  const getLatestActivityLogs = async (newFilterModel = taskActivityFilterModel, cancelSource = cancelTokenSource) => {
    const response = await taskActivityLogActions.getLatestTaskActivityLogs(getAccessToken, cancelSource, newFilterModel);
    const taskActivityData = response?.data?.data;

    if (Array.isArray(taskActivityData)) {
      setActivityData([...taskActivityData]);
      setTaskActivityMetadata(response?.data?.metadata);
      newFilterModel?.setData("totalCount", response?.data?.count);
      newFilterModel?.setData("activeFilters", newFilterModel?.getActiveFilters());
      setTaskActivityFilterModel({...newFilterModel});
    }
  };

  const getSingleRunLogs = async (newFilterModel = taskActivityFilterModel, cancelSource = cancelTokenSource) => {
    const response = await taskActivityLogActions.getTaskActivityLogsByIdAndRunCount(getAccessToken, cancelSource, currentTaskId, currentRunNumber, newFilterModel);
    const taskActivityData = response?.data?.data;

    if (Array.isArray(taskActivityData)) {
      setActivityData([...taskActivityData]);
      setTaskActivityMetadata(response?.data?.metadata);
      newFilterModel?.setData("totalCount", response?.data?.count);
      newFilterModel?.setData("activeFilters", newFilterModel?.getActiveFilters());
      setTaskActivityFilterModel({...newFilterModel});
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
      <AllTasksActivityLogTreeTable
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

