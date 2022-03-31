import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import thresholdMetadata from "components/common/metadata/pipelines/thresholdMetadata";
import modelHelpers from "components/common/model/modelHelpers";
import {DialogToastContext} from "contexts/DialogToastContext";
import {
  externalRestApiIntegrationStepMetadata
} from "components/workflow/plan/step/external_rest_api_integration/externalRestApiIntegrationStep.metadata";
import ExternalApiIntegrationStepExternalApiIntegratorToolSelectInput
  from "components/workflow/plan/step/external_rest_api_integration/inputs/ExternalApiIntegrationStepExternalApiIntegratorToolSelectInput";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import pipelineActions from "components/workflow/pipeline-actions";
import ExternalApiRestIntegrationStepEndpointVerticalTabContainer
  from "components/workflow/plan/step/external_rest_api_integration/ExternalApiRestIntegrationStepEndpointVerticalTabContainer";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";

function ExternalRestApiIntegrationStepEditorPanel(
  { 
    pipelineStep, 
    pipelineId,
    closeEditorPanel,
  }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [externalRestApiIntegrationModel, setExternalRestApiIntegrationModel] = useState(undefined);
  const [thresholdModel, setThresholdModel] = useState(undefined);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [pipelineStep]);

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
    const newPipelineStep = pipelineStep;
    newPipelineStep.configuration = {...externalRestApiIntegrationModel.getPersistData()};
    newPipelineStep.threshold = {...thresholdModel.getPersistData()};

    return await pipelineActions.updatePipelineStepByIdV2(
      getAccessToken,
      cancelTokenSource,
      pipelineId,
      pipelineStep?._id,
      newPipelineStep,
    );
  };

  if (isLoading || externalRestApiIntegrationModel == null || thresholdModel == null) {
    return (
      <LoadingDialog
        size={"sm"}
      />
    );
  }

  return (
    <EditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={externalRestApiIntegrationModel}
      createRecord={callbackFunction}
      updateRecord={callbackFunction}
      lenient={true}
      isLoading={isLoading}
      className={"m-0"}
    >
      <ExternalApiIntegrationStepExternalApiIntegratorToolSelectInput
        model={externalRestApiIntegrationModel}
        setModel={setExternalRestApiIntegrationModel}
      />
      <ExternalApiRestIntegrationStepEndpointVerticalTabContainer
        externalRestApiIntegrationModel={externalRestApiIntegrationModel}
        setExternalRestApiIntegrationModel={setExternalRestApiIntegrationModel}
      />
    </EditorPanelContainer>
  );
}

ExternalRestApiIntegrationStepEditorPanel.propTypes = {
  pipelineStep: PropTypes.object,
  pipelineId: PropTypes.string,
  closeEditorPanel: PropTypes.func
};

export default ExternalRestApiIntegrationStepEditorPanel;
