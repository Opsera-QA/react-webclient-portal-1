import React, {useContext, useEffect, useRef, useState} from 'react';
import { AuthContext } from "contexts/AuthContext";
import Model from "core/data_model/model";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import gitTasksActions from "components/git/git-task-actions";
import gitTasksFilterMetadata from "components/git/git-tasks-filter-metadata";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import workflowAuthorizedActions
  from "components/workflow/pipelines/pipeline_details/workflow/workflow-authorized-actions";

export const notificationTypes = [
  {name: "SFDC Org sync", value: "sync-sfdc-repo"},
  {name: "SFDC Branch Structuring", value: "sync-branch-structure"},
  {name: "GIT to GIT Sync", value: "sync-git-branches"},
  {name: "Generate Certificate for SFDX", value: "sfdc-cert-gen"},
  {name: "Create ECS Cluster", value: "ecs_cluster_creation"},
  {name: "Create ECS Service", value: "ecs_service_creation"},
];

function GitTaskTypeSelectInput({ fieldName, dataObject, setDataObject, disabled, setDataFunction, placeholderText }) {
  const [isLoading, setIsLoading] = useState(true);
  const toastContext = useContext(DialogToastContext);
  const { getUserRecord, setAccessRoles, getAccessToken, getAccessRoleData } = useContext(AuthContext);
  const [gitTasksFilterDto, setGitTasksFilterDto] = useState(new Model({...gitTasksFilterMetadata.newObjectFields}, gitTasksFilterMetadata, false)); 
  const isMounted = useRef(false);
  const [canCreate, setCanCreate] = useState(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    getTasksList(gitTasksFilterDto, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const getTasksList = async (filterDto = gitTasksFilterDto, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      const customerAccessRules = await getAccessRoleData();
      const gitTask = dataObject.getPersistData();
      setCanCreate(workflowAuthorizedActions.gitItems(customerAccessRules, "create_cert_task", gitTask.owner, gitTask.roles));
    
      filterDto.setData("type", "sfdc-cert-gen");
      const response = await gitTasksActions.getGitTasksListV2(getAccessToken, cancelSource, filterDto);
      const tasksList = response?.data?.data;
      if (isMounted.current === true && tasksList) {
        let newFilterDto = filterDto;
        newFilterDto.setData("totalCount", response?.data?.count);
        newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
        setGitTasksFilterDto({...newFilterDto});
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

  const checkDisabledTaskType = () => {
    if( !canCreate || gitTasksFilterDto.getData("totalCount") > 0) return ["sfdc-cert-gen"];
    else return [];
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={notificationTypes}
      setDataFunction={setDataFunction}
      placeholderText={placeholderText}
      valueField="value"
      textField="name"
      busy={isLoading}
      disabled={isLoading || checkDisabledTaskType()}
    />
  );
}

GitTaskTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  placeholderText: PropTypes.string,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
};

GitTaskTypeSelectInput.defaultProps = {
  fieldName: "type",
  placeholderText: "Select Task Type"
};

export default GitTaskTypeSelectInput;