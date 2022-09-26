import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import taskActions from "components/tasks/task.actions";
import {AuthContext} from "contexts/AuthContext";
import TaskTypeSelectInputBase from "components/common/list_of_values_input/tasks/TaskTypeSelectInputBase";
import {TASK_TYPES} from "components/tasks/task.types";
import TaskRoleHelper from "@opsera/know-your-role/roles/tasks/taskRole.helper";
import useComponentStateReference from "hooks/useComponentStateReference";

function TasksTaskTypeSelectInput({ fieldName, model, setModel, setTaskConfigurationModel, disabled, placeholderText }) {
  const { featureFlagHideItemInProd } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [canCreateCertificateGenerationTask, setCanCreateCertificateGenerationTask] = useState(false);
  const {
    userData,
    cancelTokenSource,
    isMounted,
    toastContext,
    getAccessToken,
  } = useComponentStateReference();

  useEffect(() => {
    // TODO: Remove this check when Certificate Generation is released.
    if (!featureFlagHideItemInProd()) {
      getTasksList().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }
  }, []);
  
  const getTasksList = async () => {
    try {
      setIsLoading(true);
      const gitTask = model?.getPersistData();
      const canCreateCertificateGenerationTask = TaskRoleHelper.canCreateCertificateTask(userData, gitTask);

      const response = await taskActions.doesCertificateGenerationTaskExist(getAccessToken, cancelTokenSource);

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

  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = model;
    newModel.setData("type", selectedOption?.value);
    newModel.setDefaultValue("configuration");
    setTaskConfigurationModel(undefined);
    setModel({...newModel});
  };

  const clearDataFunction = () => {
    let newModel = model;
    newModel.setDefaultValue("type");
    newModel.setDefaultValue("configuration");
    setTaskConfigurationModel(undefined);
    setModel({...newModel});
  };

  return (
    <TaskTypeSelectInputBase
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      placeholderText={placeholderText}
      valueField={"value"}
      textField={"text"}
      isLoading={isLoading}
      disabled={isLoading || checkDisabledTaskType()}
    />
  );
}

TasksTaskTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  placeholderText: PropTypes.string,
  setTaskConfigurationModel: PropTypes.func,
  disabled: PropTypes.bool,
  setGitTasksConfigurationDataDto: PropTypes.func,
};

TasksTaskTypeSelectInput.defaultProps = {
  fieldName: "type",
  placeholderText: "Select Task Type"
};

export default TasksTaskTypeSelectInput;