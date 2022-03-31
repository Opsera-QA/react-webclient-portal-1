import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import azureCliCommandStepFormMetadata from "./azureCliCommand-stepForm-metadata";
import AzureCliCommandStepAzureApplicationCredentialSelectInput from "./inputs/AzureCliCommandStepAzureApplicationCredentialSelectInput";
import AzureCliCommandStepAzureToolSelectInput from "./inputs/AzureCliCommandStepAzureToolSelectInput";
import ScriptTypeSelectInput from "components/common/list_of_values_input/scripts/ScriptTypeSelectInput";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import ScriptLibrarySelectInput from "components/common/list_of_values_input/inventory/scripts/ScriptLibrarySelectInput";

function AzureCliCommandStepConfiguration({ stepTool, closeEditorPanel, parentCallback, plan, stepId, pipelineId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [azureCliCommandModel, setAzureCliCommandModel] = useState(undefined);
  const [threshold, setThreshold] = useState(undefined);
  const [azureConfig, setAzureConfig] = useState(null);
  const [applicationData, setApplicationData] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setThreshold(stepTool?.threshold);
    let azureCliCommandConfigurationData = modelHelpers.getPipelineStepConfigurationModel(
      stepTool,
      azureCliCommandStepFormMetadata
    );
    setAzureCliCommandModel(azureCliCommandConfigurationData);
    setIsLoading(false);
  };

  const saveAzureCliCommandStepConfiguration = async () => {
    const item = {
      configuration: azureCliCommandModel.getPersistData(),
      threshold: {
        type: threshold?.type,
        value: threshold?.value,
      },
    };

   return await parentCallback(item);
  };

  if (isLoading || azureCliCommandModel == null) {
    return <DetailPanelLoadingDialog />;
  }

  const getFieldsByScriptType = (type) => {
    switch (type){
      case "inline":
        return <TextAreaInput fieldName="inlineCommand" dataObject={azureCliCommandModel} setDataObject={setAzureCliCommandModel} />;

      case "package":
        return( 
          <>
          <TextInputBase fieldName="filePath" dataObject={azureCliCommandModel} setDataObject={setAzureCliCommandModel} />
          <TextInputBase fieldName="fileName" dataObject={azureCliCommandModel} setDataObject={setAzureCliCommandModel} />
          </>
        );

      case "script":
      return <ScriptLibrarySelectInput fieldName="bashScript" dataObject={azureCliCommandModel} setDataObject={setAzureCliCommandModel} language="bash" />;

      default:
        return null;
    }
  };

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={azureCliCommandModel}
      persistRecord={saveAzureCliCommandStepConfiguration}
      isLoading={isLoading}
    >
      <AzureCliCommandStepAzureToolSelectInput
        model={azureCliCommandModel}
        setModel={setAzureCliCommandModel}
        setAzureConfig={setAzureConfig}
      />
      <AzureCliCommandStepAzureApplicationCredentialSelectInput
        fieldName="azureCredentialId"
        model={azureCliCommandModel}
        setModel={setAzureCliCommandModel}
        setApplicationData={setApplicationData}
        azureToolId={azureCliCommandModel?.getData("azureToolConfigId")}
      />
      <ScriptTypeSelectInput
       filedName={"type"}
       model={azureCliCommandModel}
       setModel={setAzureCliCommandModel}
      />
      {getFieldsByScriptType(azureCliCommandModel?.getData("type"))}
      {console.log(azureCliCommandModel)}
    </PipelineStepEditorPanelContainer>
  );
}

AzureCliCommandStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func,
  parentCallback: PropTypes.func,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  pipelineId: PropTypes.string,
};

export default AzureCliCommandStepConfiguration;
