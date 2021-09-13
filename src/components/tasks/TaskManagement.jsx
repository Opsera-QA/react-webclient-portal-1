import React, {useContext, useEffect, useRef, useState} from 'react';
import { AuthContext } from "contexts/AuthContext";
import TaskTable from "components/tasks/TaskTable";
import gitTasksActions from "./git-task-actions";
import gitTasksFilterMetadata from "./git-tasks-filter-metadata";
import {DialogToastContext} from "contexts/DialogToastContext";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import FilterContainer from "components/common/table/FilterContainer";
import {faTasks} from "@fortawesome/pro-light-svg-icons";
import StatusFilter from "components/common/filters/status/StatusFilter";
import TagFilter from "components/common/filters/tags/tag/TagFilter";
import NewTaskOverlay from "components/tasks/NewTaskOverlay";
import axios from "axios";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import TasksSubNavigationBar from "components/tasks/TasksSubNavigationBar";
import InlineTaskTypeFilter from "components/common/filters/tasks/type/InlineTaskTypeFilter";

function TaskManagement() {
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [gitTasksList, setGitTasksList] = useState([]);
  const [gitTasksFilterDto, setGitTasksFilterDto] = useState(new Model({...gitTasksFilterMetadata.newObjectFields}, gitTasksFilterMetadata, false));
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(gitTasksFilterDto, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (newFilterDto = gitTasksFilterDto, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(newFilterDto, cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getRoles = async (newFilterDto = gitTasksFilterDto, cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);

    if (isMounted?.current === true && userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      await getGitTasksList(newFilterDto, cancelSource);
    }
  };

  const getGitTasksList = async (filterDto = gitTasksFilterDto, cancelSource = cancelTokenSource) => {
      const response = await gitTasksActions.getGitTasksListV2(getAccessToken, cancelSource, filterDto);
      const taskList = response?.data?.data;

      if (isMounted.current === true && Array.isArray(taskList)) {
        setGitTasksList(taskList);
        let newFilterDto = filterDto;
        newFilterDto.setData("totalCount", response?.data?.count);
        newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
        setGitTasksFilterDto({...newFilterDto});
      }
  };

  const getBody = () => {
    return (
      <TaskTable
        isLoading={isLoading}
        loadData={loadData}
        taskData={gitTasksList}
        gitTasksFilterDto={gitTasksFilterDto}
        setGitTasksFilterDto={setGitTasksFilterDto}
      />
    );
  };

  const getDropdownFilters = () => {
    return (
      <>
        <StatusFilter filterDto={gitTasksFilterDto} setFilterDto={setGitTasksFilterDto} className="mb-2" />
        <TagFilter filterDto={gitTasksFilterDto} setFilterDto={setGitTasksFilterDto} />
      </>
    );
  };

  const createNewTask = () => {
    toastContext.showOverlayPanel(<NewTaskOverlay loadData={loadData} isMounted={isMounted} />);
  };

  if (!accessRoleData) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"taskManagement"}
      pageDescription={`
        Create and Manage Opsera Related Tasks.
      `}
      navigationTabContainer={<TasksSubNavigationBar currentTab={"tasks"}/>}
    >
      <FilterContainer
        loadData={loadData}
        filterDto={gitTasksFilterDto}
        setFilterDto={setGitTasksFilterDto}
        addRecordFunction={createNewTask}
        supportSearch={true}
        isLoading={isLoading}
        // inlineFilters={
        //   <InlineTaskTypeFilter
        //     filterModel={gitTasksFilterDto}
        //     setFilterModel={setGitTasksFilterDto}
        //     className={"mr-2"}
        //     loadData={loadData}
        //   />
        //}
        body={getBody()}
        dropdownFilters={getDropdownFilters()}
        titleIcon={faTasks}
        title={"Tasks"}
        className={"px-2 pb-2"}
      />
    </ScreenContainer>
  );
}

export default TaskManagement;

