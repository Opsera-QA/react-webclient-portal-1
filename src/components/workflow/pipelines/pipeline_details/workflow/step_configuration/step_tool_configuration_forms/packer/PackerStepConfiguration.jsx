import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import PackerScmToolTypeSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/packer/inputs/PackerScmToolTypeSelectInput";
import PackerScmToolSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/packer/inputs/PackerScmToolSelectInput";
import PackerBitbucketWorkspaceSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/packer/inputs/PackerBitbucketWorkspaceSelectInput";
import PackerGitRepositorySelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/packer/inputs/PackerGitRepositorySelectInput";
import PackerGitBranchSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/packer/inputs/PackerGitBranchSelectInput";
import packerStepFormMetadata from "./packer-stepForm-metadata";
import PackerCloudProviderSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/packer/inputs/PackerCloudProviderSelectInput";
import PackerTagSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/packer/inputs/PackerTagSelectInput";
import PackerCloudCredentialSubForm from "./sub_forms/PackerCloudCredentialSubForm";
import PackerCustomScriptSubForm from "./sub_forms/PackerCustomScriptSubForm";
import PackerEnvironmentVariables from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/packer/inputs/PackerEnvironmentVariables";

function PackerStepConfiguration({ pipelineId, stepTool, stepId, createJob, closeEditorPanel, parentCallback }) {
  const [isLoading, setIsLoading] = useState(true);
  const [jobType, setJobType] = useState("");
  const [packerStepConfigurationModel, setPackerStepConfigurationModel] = useState(undefined);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");
  // const [configuration, setConfiguration] = useState("");


  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setIsLoading(true);

    let { threshold, job_type } = stepTool;
    let packerConfigurationData = modelHelpers.getPipelineStepConfigurationModel(stepTool, packerStepFormMetadata);

    if (packerConfigurationData.getData("iamRoleFlag") === true) {
      packerConfigurationData.setMetaDataFields(packerStepFormMetadata.fieldsAlt);
    }
    
    setPackerStepConfigurationModel(packerConfigurationData);
    
    if (job_type) {
      setJobType(job_type);
    }

    if (threshold) {
      setThresholdType(threshold?.type);
      setThresholdValue(threshold?.value);
    }

    setIsLoading(false);
  };

  const callbackFunction = async () => {
    const item = {
      configuration: packerStepConfigurationModel?.getPersistData(),
      threshold: {
        type: thresholdType,
        value: thresholdVal,
      },
    };
    await parentCallback(item);
  };
 
  if (isLoading || packerStepConfigurationModel == null) {
    return <DetailPanelLoadingDialog />;
  }
  
  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={packerStepConfigurationModel}
      persistRecord={callbackFunction}
      isLoading={isLoading}
    >      
      <PackerScmToolTypeSelectInput model={packerStepConfigurationModel} setModel={setPackerStepConfigurationModel} />
      <PackerScmToolSelectInput model={packerStepConfigurationModel} setModel={setPackerStepConfigurationModel} />
      <PackerBitbucketWorkspaceSelectInput model={packerStepConfigurationModel} setModel={setPackerStepConfigurationModel} />
      <PackerGitRepositorySelectInput model={packerStepConfigurationModel} setModel={setPackerStepConfigurationModel} />
      <PackerGitBranchSelectInput model={packerStepConfigurationModel} setModel={setPackerStepConfigurationModel} />
      <TextInputBase dataObject={packerStepConfigurationModel} fieldName={"gitFilePath"} setDataObject={setPackerStepConfigurationModel}/>
      <PackerTagSelectInput model={packerStepConfigurationModel} setModel={setPackerStepConfigurationModel} />
      <PackerCloudProviderSelectInput dataObject={packerStepConfigurationModel} setDataObject={setPackerStepConfigurationModel} fieldName={"cloudProvider"} />
      <PackerCloudCredentialSubForm model={packerStepConfigurationModel} setModel={setPackerStepConfigurationModel} cloudProvider={packerStepConfigurationModel?.getData("cloudProvider")} />      
      <PackerCustomScriptSubForm model={packerStepConfigurationModel} setModel={setPackerStepConfigurationModel} />
      <PackerEnvironmentVariables dataObject={packerStepConfigurationModel} setDataObject={setPackerStepConfigurationModel} />
    </PipelineStepEditorPanelContainer>
  );
}

PackerStepConfiguration.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  createJob: PropTypes.func,
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func,
  parentCallback: PropTypes.func,
};

export default PackerStepConfiguration;
