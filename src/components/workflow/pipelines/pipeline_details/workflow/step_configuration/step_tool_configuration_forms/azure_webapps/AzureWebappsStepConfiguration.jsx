import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import azureWebappsStepFormMetadata from "./azureWebapps-stepForm-metadata";
import AzureWebappsDeploymentTypeSelectInput from "./inputs/AzureWebappsDeploymentTypeSelectInput";
import AzureWebappsStepAzureToolSelectInput from "./inputs/AzureWebappsStepAzureToolSelectInput";
import AzureWebappsStepApplicationSelectInput from "./inputs/AzureWebappsStepApplicationSelectInput";
import AzureWebappSelectInput from "./inputs/AzureWebappSelectInput";
import AzureAppSettingsInput from "./inputs/AzureAppSettingsInput";
import AzureConnectionStringsInput from "./inputs/AzureConnectionStringsInput";
import AzureWebappsArtifactStepSelectInput from "./inputs/AzureWebappsArtifactStepSelectInput";
import AzureWebappPackageTypeSelectInput from "./inputs/AzureWebappPackageTypeSelectInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import AzureWebappResourceGroupSelectInput from "./inputs/AzureWebappResourceGroupSelectInput";

function AzureWebappsStepConfiguration({ stepTool, closeEditorPanel, parentCallback, plan, stepId, pipelineId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [azureWebappsModel, setAzureWebappsModel] = useState(undefined);
  const [threshold, setThreshold] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setThreshold(stepTool?.threshold);
    let azureFunctionsConfigurationData = modelHelpers.getPipelineStepConfigurationModel(
      stepTool,
      azureWebappsStepFormMetadata
    );
    setAzureWebappsModel(azureFunctionsConfigurationData);
    setIsLoading(false);
  };

  const saveAzureWebappsStepConfiguration = async () => {
    const item = {
      configuration: azureWebappsModel.getPersistData(),
      threshold: {
        type: threshold?.type,
        value: threshold?.value,
      },
    };
    await parentCallback(item);
    return closeEditorPanel();
  };

  if (isLoading || azureWebappsModel == null) {
    return <DetailPanelLoadingDialog />;
  }

  const getPackageTypeField = () => {
    if (azureWebappsModel?.getData("deploymentType")) {
      return (
        <AzureWebappPackageTypeSelectInput 
          model={azureWebappsModel}
          setModel={setAzureWebappsModel}
        />
      );
    }
  };

  const getDynamicFields = () => {
    if (azureWebappsModel?.getData("deploymentType")) {
      return (
        <>
          <TextInputBase 
            fieldName={"webappTargetPath"} 
            dataObject={azureWebappsModel} 
            setDataObject={setAzureWebappsModel}
          />
          <BooleanToggleInput 
            fieldName={"webappCleanTargetPath"}
            dataObject={azureWebappsModel}
            setDataObject={setAzureWebappsModel}
          />
        </>
      );
    }
  };  

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={azureWebappsModel}
      persistRecord={saveAzureWebappsStepConfiguration}
      isLoading={isLoading}
    >
      <AzureWebappsDeploymentTypeSelectInput
        model={azureWebappsModel}
        setModel={setAzureWebappsModel}
      />
      {getPackageTypeField()}
      <AzureWebappsStepAzureToolSelectInput
        model={azureWebappsModel}
        setModel={setAzureWebappsModel}
      />
      <AzureWebappsStepApplicationSelectInput
        model={azureWebappsModel}
        setModel={setAzureWebappsModel}
        azureToolId={azureWebappsModel?.getData("azureToolConfigId")}
      />
      <AzureWebappResourceGroupSelectInput
        model={azureWebappsModel}
        setModel={setAzureWebappsModel}
        azureToolConfigId={azureWebappsModel?.getData("azureToolConfigId")}
        azureApplication={azureWebappsModel?.getData("azureCredentialId")}
      />
      <AzureWebappSelectInput
        model={azureWebappsModel}
        setModel={setAzureWebappsModel}        
        azureToolConfigId={azureWebappsModel?.getData("azureToolConfigId")}
        applicationId={azureWebappsModel?.getData("azureCredentialId")}
        resourceGroup={azureWebappsModel?.getData("resourceGroupName")}
      />
      {getDynamicFields()}
      <BooleanToggleInput 
        dataObject={azureWebappsModel} 
        setDataObject={setAzureWebappsModel} 
        fieldName={"customVersion"} 
      />
      <AzureAppSettingsInput 
        model={azureWebappsModel}
        setModel={setAzureWebappsModel}
      />
      <AzureConnectionStringsInput 
        model={azureWebappsModel}
        setModel={setAzureWebappsModel}
      />      
      <AzureWebappsArtifactStepSelectInput 
        model={azureWebappsModel}
        setModel={setAzureWebappsModel}
        plan={plan}
        stepId={stepId}
        deploymentType={azureWebappsModel?.getData("deploymentType")}
      />
    </PipelineStepEditorPanelContainer>
  );
}

AzureWebappsStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func,
  parentCallback: PropTypes.func,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  pipelineId: PropTypes.string,
};

export default AzureWebappsStepConfiguration;
