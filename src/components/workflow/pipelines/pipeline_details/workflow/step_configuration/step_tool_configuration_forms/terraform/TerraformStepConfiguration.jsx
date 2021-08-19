import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import TerraformJobTypeSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformJobTypeSelectInput";
import TerraformSCMToolTypeSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformSCMToolTypeSelectInput";
import TerraformSCMToolSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformSCMToolSelectInput";
import TerraformBitbucketWorkspaceInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformBitbucketWorkspaceInput";
import TerraformGitRepositoryInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformGitRepositoryInput";
import TerraformGitBranchInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformGitBranchInput";
import TerraformAWSCredsSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformAWSCredsSelectInput";
import terraformStepFormMetadata from "./terraform-stepForm-metadata";
import TerraformCustomParametersInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformCustomParametersInput";
import TerraformRuntimeArgsInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformRuntimeArgsInput";

function TerraformStepConfiguration({ pipelineId, stepTool, stepId, createJob, closeEditorPanel, parentCallback }) {
  const [isLoading, setIsLoading] = useState(true);
  const [jobType, setJobType] = useState("");
  const [terraformStepConfigurationDto, setTerraformStepConfigurationDataDto] = useState(undefined);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");
  // const [configuration, setConfiguration] = useState("");


  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setIsLoading(true);

    let { threshold, job_type } = stepTool;
    let terraformConfigurationData = modelHelpers.getPipelineStepConfigurationModel(stepTool, terraformStepFormMetadata);
    
    setTerraformStepConfigurationDataDto(terraformConfigurationData);
    
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
      configuration: terraformStepConfigurationDto.getPersistData(),
      threshold: {
        type: thresholdType,
        value: thresholdVal,
      },
    };
    await parentCallback(item);
  };
 
  if (isLoading || terraformStepConfigurationDto == null) {
    return <DetailPanelLoadingDialog />;
  }
  
  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={terraformStepConfigurationDto}
      persistRecord={callbackFunction}
      isLoading={isLoading}
    >
      <TerraformJobTypeSelectInput dataObject={terraformStepConfigurationDto} setDataObject={setTerraformStepConfigurationDataDto} />
      <TerraformSCMToolTypeSelectInput dataObject={terraformStepConfigurationDto} setDataObject={setTerraformStepConfigurationDataDto} />
      <TerraformSCMToolSelectInput dataObject={terraformStepConfigurationDto} setDataObject={setTerraformStepConfigurationDataDto} />
      <TerraformBitbucketWorkspaceInput dataObject={terraformStepConfigurationDto} setDataObject={setTerraformStepConfigurationDataDto} />
      <TerraformGitRepositoryInput dataObject={terraformStepConfigurationDto} setDataObject={setTerraformStepConfigurationDataDto} />
      <TerraformGitBranchInput  dataObject={terraformStepConfigurationDto} setDataObject={setTerraformStepConfigurationDataDto} />
      <TextInputBase dataObject={terraformStepConfigurationDto} fieldName={"gitFilePath"} setDataObject={setTerraformStepConfigurationDataDto}/>
      <TerraformAWSCredsSelectInput dataObject={terraformStepConfigurationDto} setDataObject={setTerraformStepConfigurationDataDto} />
      <TextInputBase dataObject={terraformStepConfigurationDto} setDataObject={setTerraformStepConfigurationDataDto} fieldName={"accessKeyParamName"} />
      <TextInputBase dataObject={terraformStepConfigurationDto} setDataObject={setTerraformStepConfigurationDataDto} fieldName={"secretKeyParamName"} />
      <TextInputBase dataObject={terraformStepConfigurationDto} setDataObject={setTerraformStepConfigurationDataDto} fieldName={"regionParamName"} />
      <TerraformRuntimeArgsInput dataObject={terraformStepConfigurationDto} setDataObject={setTerraformStepConfigurationDataDto} />
      <TerraformCustomParametersInput
        model={terraformStepConfigurationDto}
        setModel={setTerraformStepConfigurationDataDto}
      />
    </PipelineStepEditorPanelContainer>
  );
}

TerraformStepConfiguration.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  createJob: PropTypes.func,
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func,
  parentCallback: PropTypes.func,
};

export default TerraformStepConfiguration;
