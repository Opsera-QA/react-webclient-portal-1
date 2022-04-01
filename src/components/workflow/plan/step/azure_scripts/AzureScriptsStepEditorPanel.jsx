import React, {useContext, useEffect, useRef, useState} from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import AzureScriptsStepAzureApplicationCredentialSelectInput from "components/workflow/plan/step/azure_scripts/inputs/AzureScriptsStepAzureApplicationCredentialSelectInput";
import AzureScriptsStepAzureToolSelectInput from "components/workflow/plan/step/azure_scripts/inputs/AzureScriptsStepAzureToolSelectInput";
import ScriptTypeSelectInput from "components/common/list_of_values_input/scripts/ScriptTypeSelectInput";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import ScriptLibrarySelectInput from "components/common/list_of_values_input/inventory/scripts/ScriptLibrarySelectInput";
import axios from "axios";
import thresholdMetadata from "components/common/metadata/pipelines/thresholdMetadata";
import {DialogToastContext} from "contexts/DialogToastContext";
import pipelineActions from "components/workflow/pipeline-actions";
import {AuthContext} from "contexts/AuthContext";
import {azureScriptsStepMetadata} from "components/workflow/plan/step/azure_scripts/azureScriptsStep.metadata";
import CustomParameterMultiSelectListInput
  from "components/common/list_of_values_input/parameters/list/CustomParameterMultiSelectListInput";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ScriptValueInput from "components/inventory/scripts/details/ScriptValueInput";
import TextAreaInputBase from "components/common/inputs/text/text_area/TextAreaInputBase";
import CodeInput from "components/common/inputs/code/CodeInput";

function AzureScriptsStepEditorPanel(
  {
    pipelineStep,
    pipelineId,
    closeEditorPanel,
  }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [azureScriptsStepModel, setAzureScriptsStepModel] = useState(undefined);
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
      const parsedModel = modelHelpers.parseObjectIntoModel(pipelineStep?.configuration, azureScriptsStepMetadata);
      setAzureScriptsStepModel(parsedModel);
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


  const saveAzureCliCommandStepConfiguration = async () => {
    const newPipelineStep = pipelineStep;
    newPipelineStep.configuration = {...azureScriptsStepModel.getPersistData()};
    newPipelineStep.threshold = {...thresholdModel.getPersistData()};

    return await pipelineActions.updatePipelineStepByIdV2(
      getAccessToken,
      cancelTokenSource,
      pipelineId,
      pipelineStep?._id,
      newPipelineStep,
    );
  };

  const getFieldsByScriptType = () => {
    switch (azureScriptsStepModel?.getData("type")){
      case "inline":
        return (
          <Col xs={12} md={6}>
            <CodeInput
              fieldName={"inlineCommand"}
              model={azureScriptsStepModel}
              setModel={setAzureScriptsStepModel}
              height={"400px"}
            />
          </Col>
        );
      case "package":
        return (
          <>
            <Col xs={12} md={6}>
              <TextInputBase
                fieldName={"filePath"}
                dataObject={azureScriptsStepModel}
                setDataObject={setAzureScriptsStepModel}
              />
            </Col>
            <Col xs={12} md={6}>
              <TextInputBase
                fieldName={"fileName"}
                dataObject={azureScriptsStepModel}
                setDataObject={setAzureScriptsStepModel}
              />
            </Col>
          </>
        );
      case "script":
        return (
          <>
            <Col xs={12} md={6}>
              <ScriptLibrarySelectInput
                fieldName={"bashScript"}
                model={azureScriptsStepModel}
                setModel={setAzureScriptsStepModel}
                language={"bash"}
              />
            </Col>
            <Col xs={6}/>
            <Col xs={12} md={6}>
              {/*<ScriptValueInput*/}
              {/*  model={azureScriptsStepModel}*/}
              {/*  fieldName={"bashScript"}*/}
              {/*/>*/}
            </Col>
          </>
        );
      default:
        return null;
    }
  };

  if (isLoading || azureScriptsStepModel == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={azureScriptsStepModel}
      persistRecord={saveAzureCliCommandStepConfiguration}
      isLoading={isLoading}
    >
      <Row>
        <Col xs={12} md={6}>
          <AzureScriptsStepAzureToolSelectInput
            model={azureScriptsStepModel}
            setModel={setAzureScriptsStepModel}
          />
        </Col>
        <Col xs={12} md={6}>
          <AzureScriptsStepAzureApplicationCredentialSelectInput
            fieldName={"azureCredentialId"}
            model={azureScriptsStepModel}
            setModel={setAzureScriptsStepModel}
            azureToolId={azureScriptsStepModel?.getData("azureToolConfigId")}
          />
        </Col>
        <Col xs={12} md={6}>
          <ScriptTypeSelectInput
            fieldName={"type"}
            model={azureScriptsStepModel}
            setModel={setAzureScriptsStepModel}
          />
        </Col>
        <Col xs={0} md={6} />
        {getFieldsByScriptType()}
        <Col xs={12} md={6}>
          <CustomParameterMultiSelectListInput
            model={azureScriptsStepModel}
            setModel={setAzureScriptsStepModel}
            fieldName={"parameters"}
            height={"400px"}
          />
        </Col>
      </Row>
    </PipelineStepEditorPanelContainer>
  );
}

AzureScriptsStepEditorPanel.propTypes = {
  pipelineStep: PropTypes.object,
  pipelineId: PropTypes.string,
  closeEditorPanel: PropTypes.func,
};

export default AzureScriptsStepEditorPanel;
