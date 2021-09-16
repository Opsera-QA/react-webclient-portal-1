import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import taskActions from "components/tasks/task.actions";
import workflowAuthorizedActions
  from "components/workflow/pipelines/pipeline_details/workflow/workflow-authorized-actions";
import {AuthContext} from "contexts/AuthContext";
import TaskTypeSelectInputBase from "components/common/list_of_values_input/tasks/TaskTypeSelectInputBase";
import {TASK_TYPES} from "components/tasks/task.types";

function GitTaskTypeSelectInput({ fieldName, dataObject, setDataObject, disabled, setDataFunction, placeholderText }) {
  const { featureFlagHideItemInProd } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken, getAccessRoleData } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [canCreateCertificateGenerationTask, setCanCreateCertificateGenerationTask] = useState(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    // TODO: Remove this check when Certificate Generation is released.
    if (!featureFlagHideItemInProd()) {
      getTasksList(source).catch((error) => {
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
  
  const getTasksList = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      const customerAccessRules = await getAccessRoleData();
      const gitTask = dataObject.getPersistData();
      const canCreateCertificateGenerationTask = workflowAuthorizedActions.gitItems(customerAccessRules, "create_cert_task", gitTask.owner, gitTask.roles);

      const response = await taskActions.doesCertificateGenerationTaskExist(getAccessToken, cancelSource);

      if (isMounted?.current === true) {
        setCanCreateCertificateGenerationTask(canCreateCertificateGenerationTask && response?.data === false);
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
    if (disabled === true) {
      return true;
    }

    if (!canCreateCertificateGenerationTask) {
      return [TASK_TYPES.SALESFORCE_CERTIFICATE_GENERATION];
    }
  };

  return (
    <TaskTypeSelectInputBase
      fieldName={fieldName}
      model={dataObject}
      setModel={setDataObject}
      setDataFunction={setDataFunction}
      placeholderText={placeholderText}
      valueField="value"
      textField="text"
      isLoading={isLoading}
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