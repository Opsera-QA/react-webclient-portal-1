import React, { useEffect, useState } from "react";
import { buttonLabelHelper } from "temp-library-components/helpers/label/button/buttonLabel.helper";
import pipelineActions from "components/workflow/pipeline-actions";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import useComponentStateReference from "hooks/useComponentStateReference";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import PropTypes from "prop-types";

export default function CreateWorkflowWizardPipelineInitializationScreen(
  {
    setPipeline,
    type,
    onSuccessFunction,
    templateId,
  }) {
  const [status, setStatus] = useState();
  const {
    getAccessToken,
    cancelTokenSource,
    isMounted,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    initializeSalesforcePipelineTemplate().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);


  const initializeSalesforcePipelineTemplate = async () => {
    try {
      setStatus(buttonLabelHelper.BUTTON_STATES.BUSY);
      const response = await pipelineActions.deployTemplateV2(
        getAccessToken,
        cancelTokenSource,
        // templateId,
        "630386aebcb7dc0019d1c2c9", // TODO: how to dynamically pull this?
      );

      const newPipeline = response?.data;

      if (isMongoDbId(newPipeline?._id)) {
        setStatus(buttonLabelHelper.BUTTON_STATES.SUCCESS);
        setPipeline(response?.data);
        onSuccessFunction();
      }
    }
    catch (error) {
      if (isMounted.current === true) {
        setStatus(buttonLabelHelper.BUTTON_STATES.ERROR);
        toastContext.showInlineErrorMessage(error, `Error Initializing ${type} Workflow:`);
      }
    }
  };

  const getLabel = () => {
    return buttonLabelHelper.getLabelForStatus(
      status,
      `Initializing ${type} Workflow`,
      `Initializing ${type} Workflow`,
      `Initialized ${type} Workflow!`,
      `Error Initializing ${type} Workflow!`,
    );
  };

  if (onSuccessFunction == null) {
    return null;
  }

  return (
    <div>
      <CenterLoadingIndicator customMessage={getLabel()} />
    </div>
  );
}

CreateWorkflowWizardPipelineInitializationScreen.propTypes = {
  setPipeline: PropTypes.func,
  type: PropTypes.string,
  onSuccessFunction: PropTypes.func,
  templateId: PropTypes.string,
};

