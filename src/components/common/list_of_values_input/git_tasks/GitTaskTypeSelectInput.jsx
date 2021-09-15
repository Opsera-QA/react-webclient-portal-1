import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { AuthContext } from "../../../../contexts/AuthContext";
import Model from "core/data_model/model";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import taskActions from "components/tasks/task.actions";
import gitTasksFilterMetadata from "components/tasks/git-tasks-filter-metadata";
import workflowAuthorizedActions
  from "components/workflow/pipelines/pipeline_details/workflow/workflow-authorized-actions";
import {
  nonProductionTaskTypes,
  productionTaskTypes
} from "components/common/list_of_values_input/tasks/TaskTypeSelectInput";

// TODO: Remove the disabled items from here when done
// TODO: Make a generic version if necessary and rename this
function GitTaskTypeSelectInput({ fieldName, dataObject, setDataObject, disabled, setGitTasksConfigurationDataDto, placeholderText }) {
  const { featureFlagHideItemInProd } = useContext(AuthContext);
  const envIsProd = featureFlagHideItemInProd();

  const [isLoading, setIsLoading] = useState(false);
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
    if (!envIsProd) {
      getTasksList(gitTasksFilterDto, source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

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

      // TODO: Write new route to pull whether or not a certificate generation task exists as this will not work properly with RBAC rules
      filterDto.setData("type", "sfdc-cert-gen");
      const response = await taskActions.getGitTasksListV2(getAccessToken, cancelSource, filterDto);
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
    if (!envIsProd) {
      if( !canCreate || gitTasksFilterDto.getData("totalCount") > 0) return ["sfdc-cert-gen"];
      else return [];  
    } else return [];
  };

  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = dataObject;
    newDataObject.setData("type", selectedOption.value);
    newDataObject.setData("configuration", {});
    setGitTasksConfigurationDataDto(undefined);
    setDataObject({...newDataObject});
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={featureFlagHideItemInProd() !== false ? productionTaskTypes : nonProductionTaskTypes}
      setDataFunction={setDataFunction}
      placeholderText={placeholderText}
      valueField="value"
      textField="text"
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
  setGitTasksConfigurationDataDto: PropTypes.func,
};

GitTaskTypeSelectInput.defaultProps = {
  fieldName: "type",
  placeholderText: "Select Task Type"
};

export default GitTaskTypeSelectInput;