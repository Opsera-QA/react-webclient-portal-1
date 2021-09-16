import React, {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "contexts/AuthContext";
import AllTasksActivityLogsTable
  from "components/tasks/activity_logs/AllTasksActivityLogsTable";
import Model from "core/data_model/model";
import tasksActivityLogFilterMetadata
  from "components/tasks/activity_logs/tasks-activity-log-filter-metadata";
import axios from "axios";
import taskActivityHelpers
  from "components/tasks/activity_logs/task-activity-helpers";
import {DialogToastContext} from "contexts/DialogToastContext";
import gitTaskActions from "components/tasks/task.actions";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import TasksSubNavigationBar from "components/tasks/TasksSubNavigationBar";
import FilterContainer from "components/common/table/FilterContainer";
import {faTasks} from "@fortawesome/pro-light-svg-icons";

function TaskAllActivityPanel() {
  const [loading, setLoading] = useState(false);
  const [logsIsLoading, setLogsIsLoading] = useState(false);
  const toastContext = useContext(DialogToastContext);

  const [taskActivityFilterDto, setTaskActivityFilterDto] = useState(new Model(tasksActivityLogFilterMetadata.newObjectFields, tasksActivityLogFilterMetadata, false));
  const [taskActivityMetadata, setTaskActivityMetadata] = useState(undefined);
  const [taskActivityTreeData, setTaskActivityTreeData] = useState([]);
  const [currentLogTreePage, setCurrentLogTreePage] = useState(0);
  const [activityData, setActivityData] = useState([]);

  /* Role based Access Controls */
  const { getAccessToken, getUserRecord, setAccessRoles } = useContext(AuthContext);
  const [customerAccessRules, setCustomerAccessRules] = useState({});


  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

    
  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    initComponent(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);


  const initComponent = async (cancelSource = cancelTokenSource) => {
    setLoading(true);

    const userRecord = await getUserRecord(); //RBAC Logic
    const rules = await setAccessRoles(userRecord);
    setCustomerAccessRules(rules);

    await getActivityLogs(undefined, false, cancelSource);
    setLoading(false);
  };

  useEffect(() => {
    pullLogData().catch((error) => {
    if (isMounted?.current === true) {
        throw error;
    }
    });
  }, [currentLogTreePage]);

  // TODO: Find way to put refresh inside table itself
  const getActivityLogs = async (filterDto = taskActivityFilterDto, silentLoading = false, cancelSource = cancelTokenSource) => {
    if (logsIsLoading) {
      return;
    }

    try {
      if (!silentLoading) {
        setLogsIsLoading(true);
      }

      // TODO: if search term applies ignore run count and reconstruct tree?
      const treeResponse = await gitTaskActions.getTaskActivityLogTypeTree(getAccessToken, cancelSource, filterDto);
      const taskTree = taskActivityHelpers.constructTaskTree(treeResponse?.data?.data);
      setTaskActivityTreeData([...taskTree]);

      if (Array.isArray(taskTree) && taskTree.length > 0) {
        await pullLogData(taskTree, filterDto, cancelSource);
      }
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
      console.log(error.message);
    } finally {
      setLogsIsLoading(false);
    }
  };

  const pullLogData = async (taskTree = taskActivityTreeData, filterDto = taskActivityFilterDto, cancelSource = cancelTokenSource, silentLoading = false) => {

    try {
      // create run count query based on tree -- tree is 0 index based
      const startIndex = 20 * currentLogTreePage;
      let runCountArray = [];
      let taskNameArray = [];

      if (!silentLoading) {
        setLogsIsLoading(true);
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
      const response = await gitTaskActions.getAllTaskActivityLogs(getAccessToken, cancelSource, taskNameArray, filterDto);
      const taskActivityData = response?.data?.data;

      if (taskActivityData) {
        setActivityData(taskActivityData);
        setTaskActivityMetadata(response?.data?.metadata);

        // TODO: Remove pagination.
        const newFilterDto = filterDto;
        newFilterDto.setData("totalCount", response?.data?.count);
        newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
        setTaskActivityFilterDto({...newFilterDto});
      }
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
      console.log(error.message);
    }
    finally {
      setLogsIsLoading(false);
    }
  };


  return (
    <ScreenContainer
      breadcrumbDestination={"taskManagement"}
      pageDescription={`
        Create and Manage Opsera Related Tasks.
      `}
      navigationTabContainer={<TasksSubNavigationBar currentTab={"activity"}/>}
    >
      <AllTasksActivityLogsTable
        taskLogData={activityData}
        isLoading={logsIsLoading}
        loadData={pullLogData}
        taskActivityFilterDto={taskActivityFilterDto}
        setTaskActivityFilterDto={setTaskActivityFilterDto}
        taskActivityMetadata={taskActivityMetadata}
        taskActivityTreeData={taskActivityTreeData}
        setCurrentLogTreePage={setCurrentLogTreePage}
      />
    </ScreenContainer>
  );
}

TaskAllActivityPanel.propTypes = {

};

export default TaskAllActivityPanel;

