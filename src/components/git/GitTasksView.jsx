import React, {useContext, useEffect, useRef, useState} from 'react';
import { AuthContext } from "contexts/AuthContext";
import GitTasksTable from "./GitTasksTable";
import gitTasksActions from "./git-task-actions";
import gitTasksFilterMetadata from "./git-tasks-filter-metadata";
import {DialogToastContext} from "contexts/DialogToastContext";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import AccessDeniedDialog from "components/common/status_notifications/accessDeniedInfo";
import FilterContainer from "components/common/table/FilterContainer";
import {faCodeMerge} from "@fortawesome/pro-light-svg-icons";
import StatusFilter from "components/common/filters/status/StatusFilter";
import TagFilter from "components/common/filters/tags/tag/TagFilter";
import NewGitTaskOverlay from "components/git/NewGitTaskOverlay";
import axios from "axios";

function GitTasksView() {
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [gitTasksList, setNotificationsList] = useState([]);
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

      if (userRoleAccess?.PowerUser || userRoleAccess?.Administrator || userRoleAccess?.OpseraAdministrator) {
        await getGitTasksList(newFilterDto, cancelSource);
      }
    }
  };

  const getGitTasksList = async (filterDto = gitTasksFilterDto, cancelSource = cancelTokenSource) => {
      const response = await gitTasksActions.getGitTasksListV2(getAccessToken, cancelSource, filterDto);
      const notificationsList = response?.data?.data;

      if (isMounted.current === true && notificationsList) {
        setNotificationsList(notificationsList);
        let newFilterDto = filterDto;
        newFilterDto.setData("totalCount", response?.data?.count);
        newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
        setGitTasksFilterDto({...newFilterDto});
      }
  };

  const getBody = () => {
    return (
      <GitTasksTable
        isLoading={isLoading}
        loadData={loadData}
        data={gitTasksList}
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

  const createNewNotification = () => {
    toastContext.showOverlayPanel(<NewGitTaskOverlay loadData={loadData} isMounted={isMounted} />);
  };

  // TODO: Check for role in Git.jsx and attach the role requirement to screen container
  if (!accessRoleData) {
    return <LoadingDialog size="sm" />;
  }

  if (!accessRoleData.PowerUser && !accessRoleData.Administrator && !accessRoleData.OpseraAdministrator) {
    return <AccessDeniedDialog roleData={accessRoleData} />;
  }

  return (
    <FilterContainer
      loadData={loadData}
      filterDto={gitTasksFilterDto}
      setFilterDto={setGitTasksFilterDto}
      addRecordFunction={createNewNotification}
      supportSearch={true}
      isLoading={isLoading}
      body={getBody()}
      dropdownFilters={getDropdownFilters()}
      titleIcon={faCodeMerge}
      title={"Git Tasks"}
      className={"px-2 pb-2"}
    />
  );
}

export default GitTasksView;

