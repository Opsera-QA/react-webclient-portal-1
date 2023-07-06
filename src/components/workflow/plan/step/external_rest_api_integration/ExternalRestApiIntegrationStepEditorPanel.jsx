import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import thresholdMetadata from "components/common/metadata/pipelines/thresholdMetadata";
import modelHelpers from "components/common/model/modelHelpers";
import {DialogToastContext} from "contexts/DialogToastContext";
import ExternalApiIntegrationStepExternalApiIntegratorToolSelectInput
  from "components/workflow/plan/step/external_rest_api_integration/inputs/ExternalApiIntegrationStepExternalApiIntegratorToolSelectInput";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import pipelineActions from "components/workflow/pipeline-actions";
import ExternalRestApiRestIntegrationStepEndpointVerticalTabContainer
  from "components/workflow/plan/step/external_rest_api_integration/ExternalRestApiRestIntegrationStepEndpointVerticalTabContainer";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import {faExclamationTriangle} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import externalRestApiIntegrationStepMetadata
  from "@opsera/definitions/constants/pipelines/steps/definitions/external_rest_api_integration/externalRestApiIntegrationStep.metadata";

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
      const parsedModel = modelHelpers.parseObjectIntoModel(pipelineStep?.tool?.configuration, externalRestApiIntegrationStepMetadata);
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

  const saveRecord = async () => {
    const newPipelineStep = pipelineStep;
    newPipelineStep.tool.configuration = {...externalRestApiIntegrationModel.getPersistData()};
    newPipelineStep.threshold = {...thresholdModel.getPersistData()};

    const response = await pipelineActions.updatePipelineStepByIdV2(
      getAccessToken,
      cancelTokenSource,
      pipelineId,
      pipelineStep?._id,
      newPipelineStep,
    );

    // TODO: This check is probably not necessary but leaving it in for safety for now.
    if (response?.status === 200) {
      closeEditorPanel();
    }

    return response;
  };

  const getWarningMessage = () => {
    return (
      <div className={"ml-2 mb-auto d-flex"}>
        <IconBase icon={faExclamationTriangle} className={"mr-2"} />
        <div className={"my-auto"}>
          {`
          Successful Completion Evaluation Rules take precedence over In Progress Evaluation Rules. 
          If the response does not match either the Successful Completion or In Progress Evaluation Rule, it will be considered a failure. 
          The Pipeline will continue running while it meets the In Progress Evaluation Rules until it meets the criteria 
          for Successful Completion or until the Pipeline Run timeout is reached.
        `}
        </div>
      </div>
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
      createRecord={saveRecord}
      updateRecord={saveRecord}
      lenient={true}
      isLoading={isLoading}
      extraButtons={getWarningMessage()}
      className={"m-0"}
      addAnotherOption={false}
    >
      <ExternalApiIntegrationStepExternalApiIntegratorToolSelectInput
        model={externalRestApiIntegrationModel}
        setModel={setExternalRestApiIntegrationModel}
      />
      <ExternalRestApiRestIntegrationStepEndpointVerticalTabContainer
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
