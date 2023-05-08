import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import { apiRequestHelper } from "temp-library-components/helpers/api/apiRequest.helper";
import taskActions from "components/tasks/task.actions";
import modelHelpers from "components/common/model/modelHelpers";
import tasksMetadata from "@opsera/definitions/constants/tasks/tasks.metadata";
import TaskEditorPanel from "../../../../../../../tasks/details/TaskEditorPanel";

const HEIGHT = "400px";

export default function CreateSalesforceWorkflowWizardEditorInput({
  task,
  workflowType,
  setButtonContainer,
  handleClose,
  onSuccessFunction,
}) {
  const [initializationState, setInitializationState] = useState(
    apiRequestHelper.API_REQUEST_STATES.READY,
  );
  const { getAccessToken, cancelTokenSource, isMounted, toastContext } =
    useComponentStateReference();
  const [taskData, setTaskData] = useState(
    modelHelpers.parseObjectIntoNewModelBase(task, tasksMetadata, true),
  );

  useEffect(() => {
    if (setButtonContainer) {
      setButtonContainer(undefined);
    }

    if (task) {
      updateTask().catch(() => {});
    }
  }, [task]);

  const updateTask = async () => {
    try {
      setInitializationState(apiRequestHelper.API_REQUEST_STATES.BUSY);
      const newTaskTemplateModel = modelHelpers.parseObjectIntoNewModelBase(
        task,
        tasksMetadata,
          true
      );
      await taskActions.updateGitTaskV2(
        getAccessToken,
        cancelTokenSource,
        newTaskTemplateModel,
      );
      setInitializationState(apiRequestHelper.API_REQUEST_STATES.SUCCESS);
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showInlineErrorMessage(
          error,
          "Error Finishing Workflow Initialization",
        );
        setInitializationState(apiRequestHelper.API_REQUEST_STATES.ERROR);
      }
    }
  };

  const toggleNextScreen = async () => {
    await taskActions.updateGitTaskV2(
        getAccessToken,
        cancelTokenSource,
        taskData,
    );
    await onSuccessFunction();
  };

  return (
    <div
      style={{
        minHeight: HEIGHT,
        // height: "600px",
      }}
    >
      <TaskEditorPanel
        taskData={taskData}
        setGitTasksData={setTaskData}
        wizardHandler={toggleNextScreen}
      />
    </div>
  );
}

CreateSalesforceWorkflowWizardEditorInput.propTypes = {
  task: PropTypes.object,
  workflowType: PropTypes.string,
  setButtonContainer: PropTypes.func,
  handleClose: PropTypes.func,
  onSuccessFunction: PropTypes.func,
};
