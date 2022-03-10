import React, {useContext, useState, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import ConsolidatedUserReportTaskAccessTable from "components/reports/users/user/consolidated_user_report/task_access/ConsolidatedUserReportTaskAccessTable";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import taskActions from "components/tasks/task.actions";
import Model from "core/data_model/model";
import FilterContainer from "components/common/table/FilterContainer";
import {faTasks} from "@fortawesome/pro-light-svg-icons";
import axios from "axios";
import taskMetadata from "components/tasks/git-tasks-metadata";
import genericFilterMetadata from "components/common/filters/generic-filter-metadata";

function ConsolidatedUserTaskAccessReport({ userEmailAddress }) {
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

    let newFilterDto = new Model({ ...genericFilterMetadata.newObjectFields }, genericFilterMetadata, false);
    loadData(newFilterDto, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [userEmailAddress]);

  const loadData = async (newFilterDto = taskFilterDto, cancelSource = cancelTokenSource) => {
    try {
      if (isMounted?.current === true && userEmailAddress) {
        setIsLoading(true);
        const response = await taskActions.getGitTaskAccessForUserEmail(getAccessToken, cancelSource, newFilterDto, userEmailAddress);
        const newTaskList = response?.data?.data;

        if (Array.isArray(newTaskList)) {
          setTasks(newTaskList);
          newFilterDto.setData("totalCount", response?.data?.count);
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

  const getTaskAccessTable = () => {
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

  if (!userEmailAddress) {
    return null;
  }

  return (
      <FilterContainer
        style={{minWidth: "505px"}}
        loadData={loadData}
        filterDto={taskFilterDto}
        setFilterDto={setTaskFilterDto}
        supportSearch={true}
        isLoading={isLoading}
        metadata={taskMetadata}
        type={"tasks"}
        body={getTaskAccessTable()}
        titleIcon={faTasks}
        title={"Tasks"}
      />
  );
}

ConsolidatedUserTaskAccessReport.propTypes = {
  userEmailAddress: PropTypes.string,
};

export default ConsolidatedUserTaskAccessReport;
