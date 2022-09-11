import React, { useEffect, useState } from "react";
import { buttonLabelHelper } from "temp-library-components/helpers/label/button/buttonLabel.helper";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import useComponentStateReference from "hooks/useComponentStateReference";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import PropTypes from "prop-types";
import pipelineTemplateActions from "components/admin/pipeline_templates/pipelineTemplate.actions";

export default function CreateWorkflowWizardPipelineInitializationScreen(
  {
    setPipelineFunction,
    type,
    templateIdentifier,
  }) {
  const [status, setStatus] = useState(buttonLabelHelper.BUTTON_STATES.READY);
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
      const response = await pipelineTemplateActions.deployTemplateByIdentifierV2(
        getAccessToken,
        cancelTokenSource,
        templateIdentifier,
      );

      const newPipeline = response?.data;

      if (isMongoDbId(newPipeline?._id)) {
        setStatus(buttonLabelHelper.BUTTON_STATES.SUCCESS);
        setPipelineFunction({...newPipeline});
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

  const getBody = () => {
    if (status === buttonLabelHelper.BUTTON_STATES.BUSY) {
      return (
        <CenterLoadingIndicator
          customMessage={getLabel()}
        />
      );
    }
  };

  if (setPipelineFunction == null) {
    return null;
  }

  return (
    <div
      style={{
        height: "500px",
      }}
    >
      <CenterLoadingIndicator customMessage={getLabel()} />
    </div>
  );
}

CreateWorkflowWizardPipelineInitializationScreen.propTypes = {
  setPipelineFunction: PropTypes.func,
  type: PropTypes.string,
  templateIdentifier: PropTypes.string,
};

