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

export default function CreateWorkflowWizardPipelineCompletionScreen(
  {
    pipeline,
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
          <>
            <CenteredContentWrapper>
              <H5FieldSubHeader
                subheaderText={`You Have successfully completed your ${workflowType} Workflow. Would you like to launch it now?`}
              />
            </CenteredContentWrapper>
            <ButtonContainerBase>
              <FreeTrialLaunchWorkflowButton
                workspaceItem={pipeline}
                workspaceType={workspaceConstants.WORKSPACE_ITEM_TYPES.PIPELINE}
              />
            </ButtonContainerBase>
          </>
        );
    }
  };

  return (
    <div
      className={"mt-3"}
      style={{
        height: "500px",
      }}
    >
      {getBody()}
    </div>
  );
}

CreateWorkflowWizardPipelineCompletionScreen.propTypes = {
  pipeline: PropTypes.object,
  workflowType: PropTypes.string,
};

