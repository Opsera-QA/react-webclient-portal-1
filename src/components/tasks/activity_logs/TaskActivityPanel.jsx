import React, {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "contexts/AuthContext";
import PropTypes from "prop-types";
import {useParams} from "react-router-dom";
import axios from "axios";
import taskActivityHelpers
  from "components/tasks/activity_logs/task-activity-helpers";
import {DialogToastContext} from "contexts/DialogToastContext";
import TaskActivityLogs from "components/tasks/details/TaskActivityLogs";
import {TaskActivityFilterModel} from "components/tasks/activity_logs/task-activity.filter.model";
import taskActions from "components/tasks/task.actions";

function TaskActivityPanel({ taskName }) {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const toastContext = useContext(DialogToastContext);
  const [taskActivityFilterModel, setTaskActivityFilterModel] = useState(undefined);
  const [taskActivityMetadata, setTaskActivityMetadata] = useState(undefined);
  const [taskActivityTreeData, setTaskActivityTreeData] = useState([]);
  const [currentLogTreePage, setCurrentLogTreePage] = useState(0);
  const [activityData, setActivityData] = useState([]);
  const { getAccessToken } = useContext(AuthContext);
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
  }, [currentLogTreePage]);

  useEffect(() => {
    if (taskActivityFilterModel) {
      getActivityLogs().catch((error) => {
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
      const treeResponse = await taskActions.getTaskActivityLogTree(getAccessToken, cancelSource, id, newFilterModel);
      const taskTree = taskActivityHelpers.constructSingleTaskTree(treeResponse?.data?.data);
      setTaskActivityTreeData([...taskTree]);
      setActivityData([]);

      if (Array.isArray(taskTree) && taskTree.length > 0) {
        await getActivityLogs(newFilterModel, taskTree, cancelSource);
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

  const getActivityLogs = async (filterDto = taskActivityFilterModel, taskTree = taskActivityTreeData, cancelSource = cancelTokenSource, silentLoading = false) => {
    try {
      // create run count query based on tree -- tree is 0 index based
      const startIndex = 20 * currentLogTreePage;
      let runCountArray = [];

      if (!silentLoading) {
        setIsLoading(true);
      }

      for (let i = startIndex; i < startIndex + 20 && i < taskTree.length; i++) {
        let runCount = taskTree[i].runNumber;

        if (runCount) {
          runCountArray.push(runCount);
        }
      }

      const response = await taskActions.getTaskActivityLogs(getAccessToken, cancelSource, id, runCountArray, filterDto);
      const taskActivityData = response?.data?.data;

      if (taskActivityData) {
        setActivityData(taskActivityData);
        setTaskActivityMetadata(response?.data?.metadata);
        const newFilterDto = filterDto;
        newFilterDto.setData("totalCount", response?.data?.count);
        newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
        setTaskActivityFilterModel({...newFilterDto});
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
    <TaskActivityLogs
      taskLogData={activityData}
      isLoading={isLoading}
      loadData={loadData}
      taskActivityFilterModel={taskActivityFilterModel}
      setTaskActivityFilterModel={setTaskActivityFilterModel}
      taskActivityMetadata={taskActivityMetadata}
      taskActivityTreeData={taskActivityTreeData}
      setCurrentLogTreePage={setCurrentLogTreePage}
      taskName={taskName}
    />
  );
}

TaskActivityPanel.propTypes = {
  taskName: PropTypes.string,
};

export default TaskActivityPanel;

