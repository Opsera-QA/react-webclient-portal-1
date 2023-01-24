import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import HelmScmToolTypeSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformScmToolTypeSelectInput";
import HelmScmToolSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/helm/inputs/HelmScmToolSelectInput";
import HelmBitbucketWorkspaceSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformBitbucketWorkspaceSelectInput";
import HelmGitRepositorySelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/helm/inputs/HelmGitRepositorySelectInput";
import HelmGitBranchSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformGitBranchSelectInput";
import helmStepFormMetadata from "./helm-stepForm-metadata";
import HelmCustomParametersInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/helm/inputs/HelmCustomParametersInput";
import HelmCloudProviderSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformCloudProviderSelectInput";
import CloudCredentialSubForm from "./sub_forms/CloudCredentialSubForm";
import CustomScriptSubForm from "./sub_forms/CustomScriptSubForm";

function HelmStepConfiguration({ pipelineId, stepTool, stepId, createJob, closeEditorPanel, parentCallback }) {
  const [isLoading, setIsLoading] = useState(true);
  const [helmStepConfigurationModel, setHelmStepConfigurationModel] = useState(undefined);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");


  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setIsLoading(true);

    let { threshold } = stepTool;
    let helmConfigurationData = modelHelpers.getPipelineStepConfigurationModel(stepTool,helmStepFormMetadata);
    setHelmStepConfigurationModel(helmConfigurationData);

    if (threshold) {
      setThresholdType(threshold?.type);
      setThresholdValue(threshold?.value);
    }

    setIsLoading(false);
  };

  const callbackFunction = async () => {
    const item = {
      configuration: helmStepConfigurationModel?.getPersistData(),
      threshold: {
        type: thresholdType,
        value: thresholdVal,
      },
    };
    await parentCallback(item);
  };

  if (isLoading || helmStepConfigurationModel == null) {
    return <DetailPanelLoadingDialog />;
  }
console.log(helmStepConfigurationModel);
  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={helmStepConfigurationModel}
      persistRecord={callbackFunction}
      isLoading={isLoading}
    >
      <HelmScmToolTypeSelectInput model={helmStepConfigurationModel} setModel={setHelmStepConfigurationModel} />
      <HelmScmToolSelectInput model={helmStepConfigurationModel} setModel={setHelmStepConfigurationModel} />
      <HelmBitbucketWorkspaceSelectInput model={helmStepConfigurationModel} setModel={setHelmStepConfigurationModel} />
      <HelmGitRepositorySelectInput model={helmStepConfigurationModel} setModel={setHelmStepConfigurationModel} />
      <HelmGitBranchSelectInput model={helmStepConfigurationModel} setModel={setHelmStepConfigurationModel} />
      <TextInputBase dataObject={helmStepConfigurationModel} fieldName={"gitFilePath"} setDataObject={setHelmStepConfigurationModel}/>
      <HelmCloudProviderSelectInput dataObject={helmStepConfigurationModel} setDataObject={setHelmStepConfigurationModel} fieldName={"cloudProvider"} />
      <CloudCredentialSubForm model={helmStepConfigurationModel} setModel={setHelmStepConfigurationModel} />
      <CustomScriptSubForm model={helmStepConfigurationModel} setModel={setHelmStepConfigurationModel} />
      <TextInputBase dataObject={helmStepConfigurationModel} fieldName={"inputFileName"} setDataObject={setHelmStepConfigurationModel}/>
      <TextInputBase dataObject={helmStepConfigurationModel} fieldName={"clusterName"} setDataObject={setHelmStepConfigurationModel}/>
      <TextInputBase dataObject={helmStepConfigurationModel} fieldName={"namespace"} setDataObject={setHelmStepConfigurationModel}/>
      <TextInputBase dataObject={helmStepConfigurationModel} fieldName={"resourceGroup"} setDataObject={setHelmStepConfigurationModel}/>
      <TextInputBase dataObject={helmStepConfigurationModel} fieldName={"serviceName"} setDataObject={setHelmStepConfigurationModel}/>
      <HelmCustomParametersInput
        model={helmStepConfigurationModel}
        setModel={setHelmStepConfigurationModel}
        fieldName={"saveEnvironmentVariables"}
      />
    </PipelineStepEditorPanelContainer>
  );
}

HelmStepConfiguration.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  createJob: PropTypes.func,
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func,
  parentCallback: PropTypes.func,
};

export default HelmStepConfiguration;
