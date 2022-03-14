import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import thresholdMetadata from "components/common/metadata/pipelines/thresholdMetadata";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import modelHelpers from "components/common/model/modelHelpers";
import {DialogToastContext} from "contexts/DialogToastContext";
import {
  externalRestApiIntegrationStepMetadata
} from "components/workflow/plan/step/external_rest_api_integration/externalRestApiIntegrationStep.metadata";
import ExternalApiIntegrationStepExternalApiIntegratorToolSelectInput
  from "components/workflow/plan/step/external_rest_api_integration/inputs/ExternalApiIntegrationStepExternalApiIntegratorToolSelectInput";
import ExternalApiIntegratorToolEndpointSelectInput
  from "components/common/list_of_values_input/tools/extermal_api_integrator/endpoints/ExternalApiIntegratorToolEndpointSelectInput";

function ExternalRestApiIntegrationStepEditorPanel(
  { 
    pipelineStep, 
    pipelineId, 
    parentCallback, 
    closeEditorPanel,
  }) {
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [externalRestApiIntegrationModel, setExternalRestApiIntegrationModel] = useState(undefined);
  const [thresholdModel, setThresholdModel] = useState(undefined);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      isMounted.current = false;
    };
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const parsedModel = modelHelpers.parseObjectIntoModel(pipelineStep?.configuration, externalRestApiIntegrationStepMetadata);
      setExternalRestApiIntegrationModel(parsedModel);
      const thresholdModel = modelHelpers.parseObjectIntoModel(pipelineStep?.threshold, thresholdMetadata);
      setThresholdModel(thresholdModel);
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const callbackFunction = async () => {
    const item = {
      configuration: {...externalRestApiIntegrationModel.getPersistData()},
      threshold: {
        ...thresholdModel.getPersistData()
      },
    };
    parentCallback(item);
  };

  if (isLoading || externalRestApiIntegrationModel == null || thresholdModel == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={externalRestApiIntegrationModel}
      persistRecord={callbackFunction}
      isLoading={isLoading}
    >
      <ExternalApiIntegrationStepExternalApiIntegratorToolSelectInput
        model={externalRestApiIntegrationModel}
        setModel={setExternalRestApiIntegrationModel}
      />
      <ExternalApiIntegratorToolEndpointSelectInput
        fieldName={"endpointId"}
        model={externalRestApiIntegrationModel}
        setModel={setExternalRestApiIntegrationModel}
        toolId={externalRestApiIntegrationModel?.getData("toolId")}
      />
    </PipelineStepEditorPanelContainer>
  );
}

ExternalRestApiIntegrationStepEditorPanel.propTypes = {
  pipelineStep: PropTypes.object,
  parentCallback: PropTypes.func,
  pipelineId: PropTypes.string,
  closeEditorPanel: PropTypes.func
};

export default ExternalRestApiIntegrationStepEditorPanel;
