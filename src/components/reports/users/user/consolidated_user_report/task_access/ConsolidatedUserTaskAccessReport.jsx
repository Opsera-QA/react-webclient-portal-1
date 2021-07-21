import React, {useContext, useState, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import InfoDialog from "components/common/status_notifications/info";
import taskFilterMetadata from "components/git/git-tasks-filter-metadata";
import ConsolidatedUserReportTaskAccessTable from "components/reports/users/user/consolidated_user_report/task_access/ConsolidatedUserReportTaskAccessTable";
import InformationDialog from "components/common/status_notifications/info";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import gitTasksActions from "components/git/git-task-actions";
import Model from "core/data_model/model";
import FilterContainer from "components/common/table/FilterContainer";
import {faTasks} from "@fortawesome/pro-light-svg-icons";
import axios from "axios";
import taskMetadata from "components/git/git-tasks-metadata";

function ConsolidatedUserTaskAccessReport({ selectedUser }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [taskFilterDto, setTaskFilterDto] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    setTasks([]);

    let newFilterDto = new Model({ ...taskFilterMetadata.newObjectFields }, taskFilterMetadata, false);
    loadData(newFilterDto, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [selectedUser]);

  const loadData = async (newFilterDto = taskFilterDto, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);

      if (isMounted?.current === true && selectedUser) {
        const response = await gitTasksActions.getGitTaskAccessForUserEmail(getAccessToken, cancelSource, newFilterDto, selectedUser?.emailAddress);
        const newTaskList = response?.data?.data;

        if (Array.isArray(newTaskList)) {
          setTasks(newTaskList);
          newFilterDto.setData("totalCount", newTaskList.length);
          newFilterDto.setData("pageSize", 25);
          newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());

          setTaskFilterDto({...newFilterDto});
        }
      }
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

  const getView = () => {

    return (
      <ConsolidatedUserReportTaskAccessTable
        isLoading={isLoading}
        paginationModel={taskFilterDto}
        setPaginationModel={setTaskFilterDto}
        data={tasks}
        loadData={loadData}
      />
    );
  };

  const getTasksBody = () => {
    if (isLoading) {
      return (<LoadingDialog size="md" message="Loading tasks..."/>);
    }

    if (!Array.isArray(tasks) || tasks.length === 0) {
      const activeFilters = taskFilterDto?.getActiveFilters();
      if (activeFilters && activeFilters.length > 0) {
        return (
          <div className="px-2 max-content-width mx-auto" >
            <div className="my-5"><InfoDialog message="No tasks meeting the filter requirements were found."/></div>
          </div>
        );
      }

      return (
        <div className="px-2 max-content-width" >
          <div className="my-5"><InfoDialog message="No tasks are available for this view at this time."/></div>
        </div>
      );
    }

    return (getView());
  };

  if (!tasks && !isLoading || !Array.isArray(tasks)) {
    return (
      <div className="px-2 max-content-width" >
        <div className="my-5">
          <InformationDialog message="Could not load tasks."/>
        </div>
      </div>
    );
  }

  if (!selectedUser) {
    return null;
  }

  return (
      <FilterContainer
        style={{minWidth: "505px"}}
        loadData={loadData}
        filterDto={taskFilterDto}
        setFilterDto={setTaskFilterDto}
        supportSearch={true}
        supportViewToggle={false}
        isLoading={isLoading}
        metadata={taskMetadata}
        type={"tasks"}
        body={getTasksBody()}
        titleIcon={faTasks}
        title={"Tasks"}
      />
  );
}

ConsolidatedUserTaskAccessReport.propTypes = {
  selectedUser: PropTypes.object,
};

export default ConsolidatedUserTaskAccessReport;
