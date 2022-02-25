import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import TextInputBase from "../../../../../../../common/inputs/text/TextInputBase";
import aksStepFormMetadata from "./aks-stepForm-metadata";
import AksServiceDeployStepAzureToolSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/aks_service_deploy/inputs/AksServiceDeployStepAzureToolSelectInput";
import AksServiceDeployStepApplicationSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/aks_service_deploy/inputs/AksServiceDeployStepApplicationSelectInput";
import DynamicNameToggleInput from "./inputs/DynamicNameToggleInput";
import DockerPushStepSelectInput from "./inputs/DockerPushStepSelectInput";
import AzureResourceGroupSelect from "./inputs/AzureResourceGroupSelect";
import ResourceGroupToggleInput from "./inputs/ResourceGroupToggleInput";
import AksServiceDeployStepClusterSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/aks_service_deploy/inputs/AksServiceDeployStepClusterSelectInput";

function AksServiceDeployStepConfiguration({ stepTool, closeEditorPanel, parentCallback, plan, stepId, pipelineId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [aksModel, setAksModel] = useState(undefined);
  const [threshold, setThreshold] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setThreshold(stepTool?.threshold);
    let aksServiceConfigurationData = modelHelpers.getPipelineStepConfigurationModel(
      stepTool,
      aksStepFormMetadata
    );
    setAksModel(aksServiceConfigurationData);
    setIsLoading(false);
  };

  const callbackFunction = async () => {
    const item = {
      configuration: aksModel.getPersistData(),
      threshold: {
        type: threshold?.type,
        value: threshold?.value,
      },
    };
    parentCallback(item);
  };

  if (isLoading || aksModel == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={aksModel}
      persistRecord={callbackFunction}
      isLoading={isLoading}
    >
      <AksServiceDeployStepAzureToolSelectInput
        model={aksModel}
        setModel={setAksModel}
      />
      <AksServiceDeployStepApplicationSelectInput
        model={aksModel}
        setModel={setAksModel}
      />
      <AksServiceDeployStepClusterSelectInput
        dataObject={aksModel}
        setDataObject={setAksModel}
        azureToolConfigId={aksModel?.getData("azureToolConfigId")}
        applicationId={aksModel?.getData("azureCredentialId")}
      />
      <DynamicNameToggleInput
        dataObject={aksModel}
        setDataObject={setAksModel}
        fieldName={"dynamicServiceName"}
        pipelineId={pipelineId}
      />
      {aksModel && !aksModel?.getData("dynamicServiceName") && (
        <TextInputBase
          dataObject={aksModel}
          setDataObject={setAksModel}
          fieldName={"aksServiceName"}
        />
      )}
      <ResourceGroupToggleInput
        dataObject={aksModel}
        setDataObject={setAksModel}
        fieldName={"useCustomResourceGroup"}
      />
      {aksModel && aksModel?.getData("useCustomResourceGroup") && (
        <AzureResourceGroupSelect
          dataObject={aksModel}
          setDataObject={setAksModel}
          azureToolConfigId={aksModel?.getData("azureToolConfigId")}
          azureApplication={aksModel?.getData("azureCredentialId")}
          clusterName={aksModel?.getData("aksClusterName")}
          disabled={aksModel?.getData("aksClusterName")?.length === 0}
        />
      )
      }
      <TextInputBase
        dataObject={aksModel}
        setDataObject={setAksModel}
        fieldName={"aksHostURL"}
      />
      <TextInputBase
        dataObject={aksModel}
        setDataObject={setAksModel}
        fieldName={"aksServicePort"}
      />
      <DockerPushStepSelectInput
        dataObject={aksModel}
        setDataObject={setAksModel}
        plan={plan}
        stepId={stepId}
      />
    </PipelineStepEditorPanelContainer>
  );
}

AksServiceDeployStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func,
  parentCallback: PropTypes.func,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  pipelineId: PropTypes.string,
};

export default AksServiceDeployStepConfiguration;
