import React, {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "contexts/AuthContext";
import AllTasksActivityLogs
  from "components/tasks/activity_logs/all_tasks/AllTasksActivityLogs";
import axios from "axios";
import taskActivityHelpers
  from "components/tasks/activity_logs/task-activity-helpers";
import {DialogToastContext} from "contexts/DialogToastContext";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import TasksSubNavigationBar from "components/tasks/TasksSubNavigationBar";
import taskActions from "components/tasks/task.actions";
import {TaskActivityFilterModel} from "components/tasks/activity_logs/task-activity.filter.model";

function TaskAllActivityPanel() {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [taskActivityFilterModel, setTaskActivityFilterModel] = useState(undefined);
  const [taskActivityMetadata, setTaskActivityMetadata] = useState(undefined);
  const [taskActivityTreeData, setTaskActivityTreeData] = useState([]);
  const [currentLogTreePage, setCurrentLogTreePage] = useState(0);
  const [activityData, setActivityData] = useState([]);
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
    if (taskActivityFilterModel) {
      loadActivityLogs().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }
  }, [currentLogTreePage]);

  // TODO: Find way to put refresh inside table itself
  const loadData = async (newFilterModel = taskActivityFilterModel, silentLoading = false, cancelSource = cancelTokenSource) => {
    try {
      if (!silentLoading) {
        setIsLoading(true);
      }

      // TODO: if search term applies ignore run count and reconstruct tree?
      const treeResponse = await taskActions.getAllTasksActivityTree(getAccessToken, cancelSource, newFilterModel);
      const taskTree = taskActivityHelpers.constructAllTasksTree(treeResponse?.data?.data);
      setTaskActivityTreeData([...taskTree]);
      setActivityData([]);

      if (Array.isArray(taskTree) && taskTree.length > 0) {
        await loadActivityLogs(newFilterModel, taskTree, cancelSource);
      }
      else {
        newFilterModel?.setData("totalCount", 0);
        newFilterModel?.setData("activeFilters", newFilterModel?.getActiveFilters());
        setTaskActivityFilterModel({...newFilterModel});
      }
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loadActivityLogs = async (newFilterModel = taskActivityFilterModel, taskTree = taskActivityTreeData, cancelSource = cancelTokenSource, silentLoading = false) => {
    try {
      // create run count query based on tree -- tree is 0 index based
      const startIndex = 20 * currentLogTreePage;
      let runCountArray = [];
      let taskNameArray = [];

      if (!silentLoading) {
        setIsLoading(true);
      }

      for (let i = startIndex; i < startIndex + 20 && i < taskTree.length; i++) {
        let runCount = taskTree[i].runNumber;
        let taskName = taskTree[i].taskName;

        if (runCount) {
          runCountArray.push(runCount);
        }
        if (taskName) {
          taskNameArray.push(taskName);
        }
      }

      const response = await taskActions.getAllTaskActivityLogs(getAccessToken, cancelSource, taskNameArray, runCountArray, newFilterModel);
      const taskActivityData = response?.data?.data;

      if (Array.isArray(taskActivityData)) {
        setActivityData([...taskActivityData]);
        setTaskActivityMetadata(response?.data?.metadata);
        newFilterModel?.setData("totalCount", response?.data?.count);
        newFilterModel?.setData("activeFilters", newFilterModel?.getActiveFilters());
        setTaskActivityFilterModel({...newFilterModel});
      }
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
      console.log(error.message);
    }
    finally {
      setIsLoading(false);
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
        loadData={loadData}
        taskActivityFilterModel={taskActivityFilterModel}
        setTaskActivityFilterModel={setTaskActivityFilterModel}
        taskActivityMetadata={taskActivityMetadata}
        taskActivityTreeData={taskActivityTreeData}
        currentLogTreePage={currentLogTreePage}
        setCurrentLogTreePage={setCurrentLogTreePage}
      />
    </ScreenContainer>
  );
}

TaskAllActivityPanel.propTypes = {

};

export default TaskAllActivityPanel;

