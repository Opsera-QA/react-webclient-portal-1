import React, {useContext, useState, useEffect, useRef, useMemo} from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import InfoDialog from "components/common/status_notifications/info";
import taskFilterMetadata from "components/git/git-tasks-filter-metadata";
import InformationDialog from "components/common/status_notifications/info";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import gitTasksActions from "components/git/git-task-actions";
import Model from "core/data_model/model";
import FilterContainer from "components/common/table/FilterContainer";
import {faTasks} from "@fortawesome/pro-light-svg-icons";
import axios from "axios";
import taskMetadata from "components/git/git-tasks-metadata";
import accountsActions from "components/admin/accounts/accounts-actions";
import CustomTable from "components/common/table/CustomTable";
import {getTableBooleanIconColumn, getTableDateColumn, getTableTextColumn, getPipelineActivityStatusColumn} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import { useHistory } from "react-router-dom";


function UserTaskOwnershipReportTable({ selectedUser }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [taskFilterDto, setTaskFilterDto] = useState(new Model({ ...taskFilterMetadata.newObjectFields }, taskFilterMetadata, false));
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [tasks, setTasks] = useState([]);
  const fields = taskMetadata.fields;
  const history = useHistory();


  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    setTasks([]);

    let newFilterDto = taskFilterDto;
    newFilterDto.resetData();
    setTaskFilterDto(newFilterDto);

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [selectedUser]);

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name"),"force-text-wrap"),
      getTableTextColumn(getField(fields, "description"),"force-text-wrap"),
      getTableTextColumn(getField(fields, "type")),
      getTableDateColumn(getField(fields, "createdAt")),
      getTableBooleanIconColumn(getField(fields, "active")),
      getPipelineActivityStatusColumn(getField(fields, "status")),
    ],
    []
  );

  const onRowSelect = (rowData) => {
    if (rowData?.original?._id) {
      history.push(`/task/details/${rowData?.original?._id}`);
    }
  };

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);

      if (isMounted?.current === true && selectedUser){
        const userId = await getUserId();
        const owner = {
          value: userId, 
          text: `${selectedUser?.firstName} ${selectedUser.lastName} (${selectedUser.email})`
        };

        if (owner?.value) {
          const response = await gitTasksActions.getGitTasksListV2(getAccessToken, cancelSource, taskFilterDto);
          const newTaskList = response?.data?.data.filter(task => task?.owner === owner.value);

          if (Array.isArray(newTaskList)) {
            setTasks(newTaskList);

            let newFilterDto = taskFilterDto;
            newFilterDto.setData("totalCount", newTaskList.length);
            newFilterDto.setData("pageSize", 25);
            newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
      
            setTaskFilterDto({...newFilterDto});
          }
        }
    }
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        console.log(error.error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getUserId = async () => {
    const response = await accountsActions.getAccountUsers(getAccessToken);
    const users = response?.data;
    
    if (!users) {
      return undefined;
    }

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      if (user.email === selectedUser.email) {
        return user._id;
      }
    }
  };

  const getView = () => {
    if (isLoading) {
      return (<LoadingDialog size="md" message="Loading tasks..."/>);
    }

    return (
      <CustomTable
        className="table-no-border"
        isLoading={isLoading}
        paginationDto={taskFilterDto}
        setPaginationDto={setTaskFilterDto}
        data={tasks}
        loadData={loadData}
        columns={columns}
        onRowSelect={onRowSelect}
      />
    );
  };

  const getTasksBody = () => {
    if (tasks && tasks.length === 0 && !isLoading) {
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
        className={"px-3"} md={12} lg={12}
        loadData={loadData}
        filterDto={taskFilterDto}
        setFilterDto={setTaskFilterDto}
        supportSearch={true}
        supportViewToggle={false}
        isLoading={isLoading}
        metadata={taskMetadata}
        body={getTasksBody()}
        titleIcon={faTasks}
        title={"Tasks"}
      />
  );
}

UserTaskOwnershipReportTable.propTypes = {
  selectedUser: PropTypes.object,
};

export default UserTaskOwnershipReportTable;
