import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import pipelineActions from "components/workflow/pipeline-actions";
import { apiRequestHelper } from "temp-library-components/helpers/api/apiRequest.helper";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";

export default function CreateSalesforceWorkflowWizardCompletionScreen(
  {
    pipeline,
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
          <CenterLoadingIndicator customMessage={"Finishing up initialization for your new Salesforce Workflow"} />
        );
      case apiRequestHelper.API_REQUEST_STATES.ERROR:
        return (
          <div>
            There was an issue finalizing the initialization for this Salesforce Workflow. Please try once more.
          </div>
        );
      case apiRequestHelper.API_REQUEST_STATES.SUCCESS:
        return (
          <div>
            You have successfully set up this Salesforce Workflow!
          </div>
        );
    }
  };

  return (
    <div>
      {getBody()}
    </div>
  );
}

CreateSalesforceWorkflowWizardCompletionScreen.propTypes = {
  pipeline: PropTypes.object
};

