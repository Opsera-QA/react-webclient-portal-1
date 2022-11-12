import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import { apiRequestHelper } from "temp-library-components/helpers/api/apiRequest.helper";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import taskActions from "components/tasks/task.actions";
import modelHelpers from "components/common/model/modelHelpers";
import tasksMetadata from "components/tasks/details/tasks/task-metadata";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import FreeTrialLaunchWorkflowButton
  from "components/wizard/free_trial/workflows/flows/selection/FreeTrialLaunchWorkflowButton";
import { workspaceConstants } from "components/workspace/workspace.constants";
import OpseraInfinityLogoLarge from "components/logo/OpseraInfinityLogoLarge";
import CancelOverlayButton from "components/common/buttons/cancel/overlay/CancelOverlayButton";
import DoneOverlayButton from "components/common/buttons/done/overlay/DoneOverlayButton";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";

const HEIGHT = "400px";

export default function CreateWorkflowWizardTaskCompletionScreen(
  {
    task,
    workflowType,
    setButtonContainer,
  }) {
  const [initializationState, setInitializationState] = useState(apiRequestHelper.API_REQUEST_STATES.READY);
  const {
    getAccessToken,
    cancelTokenSource,
    isMounted,
    toastContext,
  } = useComponentStateReference();

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
          <CenteredContentWrapper
            minHeight={HEIGHT}
          >
            <OpseraInfinityLogoLarge
              scale={.4}
            />
            <div>
              <H5FieldSubHeader
                subheaderText={`You have successfully completed creating your new ${workflowType} Task!`}
              />
              <H5FieldSubHeader
                subheaderText={`Now you can either return to the home page or start the Task.`}
                className={"my-3"}
              />
              <div className={"focusText"}>
                You can start your Task anytime you want from the Opsera home page.
              </div>
              <div className={"d-flex"}>
                <ButtonContainerBase
                  className={"mt-5 ml-auto"}
                >
                  <DoneOverlayButton
                    className={"mr-2"}
                  />
                  <FreeTrialLaunchWorkflowButton
                    workspaceItem={task}
                    workspaceType={workspaceConstants.WORKSPACE_ITEM_TYPES.TASK}
                  />
                </ButtonContainerBase>
              </div>
            </div>
          </CenteredContentWrapper>
        );
    }
  };

  return (
    <div
      style={{
        minHeight: HEIGHT,
        height: HEIGHT,
      }}
    >
      {getBody()}
    </div>
  );
}

CreateWorkflowWizardTaskCompletionScreen.propTypes = {
  task: PropTypes.object,
  workflowType: PropTypes.string,
  setButtonContainer: PropTypes.func,
};

