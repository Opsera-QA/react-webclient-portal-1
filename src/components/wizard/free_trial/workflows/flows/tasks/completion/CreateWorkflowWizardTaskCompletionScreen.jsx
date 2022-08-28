import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import { apiRequestHelper } from "temp-library-components/helpers/api/apiRequest.helper";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import taskActions from "components/tasks/task.actions";
import modelHelpers from "components/common/model/modelHelpers";
import tasksMetadata from "components/tasks/details/tasks/task-metadata";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import FreeTrialLaunchWorkflowButton
  from "components/wizard/free_trial/workflows/flows/selection/FreeTrialLaunchWorkflowButton";
import { workspaceConstants } from "components/workspace/workspace.constants";

export default function CreateWorkflowWizardTaskCompletionScreen(
  {
    task,
    workflowType,
  }) {
  const [initializationState, setInitializationState] = useState(apiRequestHelper.API_REQUEST_STATES.READY);
  const {
    getAccessToken,
    cancelTokenSource,
    isMounted,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    if (task) {
      updateTask().catch(() => {});
    }
  }, [task]);

  const updateTask = async () => {
    try {
      setInitializationState(apiRequestHelper.API_REQUEST_STATES.BUSY);
      const newTaskTemplateModel = modelHelpers.parseObjectIntoModel(task, tasksMetadata);
      await taskActions.updateGitTaskV2(getAccessToken, cancelTokenSource, newTaskTemplateModel);
      setInitializationState(apiRequestHelper.API_REQUEST_STATES.SUCCESS);
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showInlineErrorMessage(error, "Error Finishing Workflow Initialization");
        setInitializationState(apiRequestHelper.API_REQUEST_STATES.ERROR);
      }
    }
  };

  const getBody = () => {
    switch (initializationState) {
      case apiRequestHelper.API_REQUEST_STATES.BUSY:
        return (
          <CenterLoadingIndicator customMessage={`Finishing up initialization for your ${workflowType} Workflow`} />
        );
      case apiRequestHelper.API_REQUEST_STATES.ERROR:
        return (
          <div>
            There was an issue finalizing the initialization for this {workflowType} Workflow. Please try once more.
          </div>
        );
      case apiRequestHelper.API_REQUEST_STATES.SUCCESS:
        return (
          <>
            <CenteredContentWrapper>
              <H5FieldSubHeader
                subheaderText={`You Have successfully completed creating your new ${workflowType} Workflow. Would you like to launch it now?`}
              />
            </CenteredContentWrapper>
            <ButtonContainerBase>
              <FreeTrialLaunchWorkflowButton
                workspaceItem={task}
                workspaceType={workspaceConstants.WORKSPACE_ITEM_TYPES.TASK}
              />
            </ButtonContainerBase>
          </>
        );
    }
  };

  return (
    <div>
      {getBody()}
    </div>
  );
}

CreateWorkflowWizardTaskCompletionScreen.propTypes = {
  task: PropTypes.object,
  workflowType: PropTypes.string,
};

