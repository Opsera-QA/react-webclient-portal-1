import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import pipelineActions from "components/workflow/pipeline-actions";
import { apiRequestHelper } from "temp-library-components/helpers/api/apiRequest.helper";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import FreeTrialLaunchWorkflowButton
  from "components/wizard/free_trial/workflows/flows/selection/FreeTrialLaunchWorkflowButton";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import { workspaceConstants } from "components/workspace/workspace.constants";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import OpseraInfinityLogoLarge from "components/logo/OpseraInfinityLogoLarge";
import DoneOverlayButton from "components/common/buttons/done/overlay/DoneOverlayButton";

const HEIGHT = "400px";

export default function CreateWorkflowWizardPipelineCompletionScreen(
  {
    pipeline,
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

    if (pipeline) {
      updatePipeline().catch(() => {});
    }
  }, [pipeline]);

  const updatePipeline = async () => {
    try {
      setInitializationState(apiRequestHelper.API_REQUEST_STATES.BUSY);
      await pipelineActions.updatePipelineV2(getAccessToken, cancelTokenSource, pipeline?._id, pipeline);
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
          <CenterLoadingIndicator customMessage={`Finishing up initialization for your new ${workflowType} Workflow`} />
        );
      case apiRequestHelper.API_REQUEST_STATES.ERROR:
        return (
          <CenteredContentWrapper>
            There was an issue finalizing the initialization for this {workflowType} Workflow. Please try once more.
          </CenteredContentWrapper>
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
                subheaderText={`You have successfully completed creating your new ${workflowType} Pipeline!`}
              />
              <H5FieldSubHeader
                subheaderText={`Now you can either return to the home page or start the Pipeline.`}
                className={"my-3"}
              />
              <div className={"focusText"}>
                You can start your Pipeline anytime you want from the Opsera home page.
              </div>
              <div className={"d-flex"}>
                <ButtonContainerBase
                  className={"mt-5 ml-auto"}
                >
                  <DoneOverlayButton
                    className={"mr-2"}
                  />
                  <FreeTrialLaunchWorkflowButton
                    workspaceItem={pipeline}
                    workspaceType={workspaceConstants.WORKSPACE_ITEM_TYPES.PIPELINE}
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

CreateWorkflowWizardPipelineCompletionScreen.propTypes = {
  pipeline: PropTypes.object,
  workflowType: PropTypes.string,
  setButtonContainer: PropTypes.func,
};

