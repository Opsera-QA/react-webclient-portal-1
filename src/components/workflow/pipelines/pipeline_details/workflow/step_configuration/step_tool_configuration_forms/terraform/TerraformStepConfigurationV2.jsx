import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import terrascanStepFormMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terrascan/terrascan-stepForm-metadata";
import TerrascanJenkinsToolInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terrascan/inputs/TerrascanJenkinsToolInput";
import TerrascanJenkinsJobInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terrascan/inputs/TerrascanJenkinsJobInput";
import modelHelpers from "components/common/model/modelHelpers";
import TerrascanJenkinsAccountInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terrascan/inputs/TerrascanJenkinsAccountInput";
import TerrascanGitRepositoryInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terrascan/inputs/TerrascanGitRepositoryInput";
import TerrascanGitBranchInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terrascan/inputs/TerrascanGitBranchInput";
import TerrascanBitbucketWorkspaceInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terrascan/inputs/TerrascanBitbucketWorkspaceInput";
import TerrascanDependencyTypeInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terrascan/inputs/TerrascanDependencyTypeInput";
import WorkspaceDeleteToggleInput from "../terrascan/inputs/WorkspaceDeleteToggleInput";
import TerrascanPlatformSelectInput from "../terrascan/inputs/TerrascanPlatformSelectInput";
import TerrascanRulesInput from "../terrascan/inputs/TerrascanRulesInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import TerraformJobTypeSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformJobTypeSelectInput";
import TerraformSCMToolTypeSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformSCMToolTypeSelectInput";
import TerraformSCMToolSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformSCMToolSelectInput";
import TerraformBitbucketWorkspaceInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformBitbucketWorkspaceInput";
import TerraformGitRepositoryInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformGitRepositoryInput";
import TerraformGitBranchInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformGitBranchInput";
import TerraformAWSCredsSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformAWSCredsSelectInput";
import terraformStepFormMetadata from "./terraform-stepForm-metadata";
import Model from "core/data_model/model";

function TerrascanStepConfiguration({ pipelineId, stepTool, stepId, createJob, closeEditorPanel, parentCallback }) {
  const [isLoading, setIsLoading] = useState(false);
  const [jobType, setJobType] = useState("");
  const [terraformStepConfigurationDto, setTerraformStepConfigurationDataDto] = useState(undefined);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");
  // const [configuration, setConfiguration] = useState("");


  useEffect(() => {
    setIsLoading(true);
    loadData();
    setIsLoading(false);
  }, []);

  const loadData = async () => {
    
    console.log(stepTool);
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

    
  };

  const callbackFunction = async () => {
    const item = {
      configuration: terraformStepConfigurationDto.getPersistData(),
      threshold: {
        type: thresholdType,
        value: thresholdVal,
      },
    };
    console.log(item);
    parentCallback(item);
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
      <TerraformSCMToolSelectInput dataObject={terraformStepConfigurationDto} setDataObject={setTerraformStepConfigurationDataDto} disabled={isLoading} />
      <TerraformBitbucketWorkspaceInput dataObject={terraformStepConfigurationDto} setDataObject={setTerraformStepConfigurationDataDto} />
      <TerraformGitRepositoryInput dataObject={terraformStepConfigurationDto} setDataObject={setTerraformStepConfigurationDataDto} />
      <TerraformGitBranchInput  dataObject={terraformStepConfigurationDto} setDataObject={setTerraformStepConfigurationDataDto} />
      <TextInputBase dataObject={terraformStepConfigurationDto} fieldName={"gitFilePath"} setDataObject={setTerraformStepConfigurationDataDto}/>
      <TerraformAWSCredsSelectInput dataObject={terraformStepConfigurationDto} setDataObject={setTerraformStepConfigurationDataDto} />
    </PipelineStepEditorPanelContainer>
  );
}

TerrascanStepConfiguration.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  createJob: PropTypes.func,
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func,
  parentCallback: PropTypes.func,
};

export default TerrascanStepConfiguration;
