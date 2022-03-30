import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import TerraformJobTypeSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformJobTypeSelectInput";
import TerraformScmToolTypeSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformScmToolTypeSelectInput";
import TerraformScmToolSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformScmToolSelectInput";
import TerraformBitbucketWorkspaceSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformBitbucketWorkspaceSelectInput";
import TerraformGitRepositorySelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformGitRepositorySelectInput";
import TerraformGitBranchSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformGitBranchSelectInput";
import TerraformAwsCredentialsSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/aws/TerraformAwsCredentialsSelectInput";
import terraformStepFormMetadata from "./terraform-stepForm-metadata";
import TerraformCustomParametersInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformCustomParametersInput";
import TerraformRuntimeArgsInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformRuntimeArgsInput";
import TerraformIamRolesSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/aws/TerraformIamRolesSelectInput";
import TerraformIAmRoleFlagToggleInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/aws/TerraformIAmRoleFlagToggleInput";
import TerraformStoreStateInS3Toggle from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/aws/TerraformStoreStateInS3Toggle";
import TerraformS3BucketSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/aws/TerraformS3BucketSelectInput";
import TerraformS3BucketRegionSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/aws/TerraformS3BucketRegionSelectInput";
import TerraformCloudProviderSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformCloudProviderSelectInput";
import TerraformTagSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformTagSelectInput";
import TerraformStateSubForm from "./sub_forms/TerraformStateSubForm";
import CloudCredentialSubForm from "./sub_forms/CloudCredentialSubForm";
import CustomScriptSubForm from "./sub_forms/CustomScriptSubForm";

function TerraformStepConfiguration({ pipelineId, stepTool, stepId, createJob, closeEditorPanel, parentCallback }) {
  const [isLoading, setIsLoading] = useState(true);
  const [jobType, setJobType] = useState("");
  const [terraformStepConfigurationModel, setTerraformStepConfigurationModel] = useState(undefined);
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
    
    if (terraformConfigurationData.getData("iamRoleFlag") === true) {
      terraformConfigurationData.setMetaDataFields(terraformStepFormMetadata.fieldsAlt);
    }
    setTerraformStepConfigurationModel(terraformConfigurationData);
    
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
      configuration: terraformStepConfigurationModel?.getPersistData(),
      threshold: {
        type: thresholdType,
        value: thresholdVal,
      },
    };
    await parentCallback(item);
  };

  // const getS3BucketFields = () => {
  //   if(terraformStepConfigurationModel?.getData('storeStateInBucket')) {
  //     return (
  //       <>
  //         <TerraformS3BucketSelectInput dataObject={terraformStepConfigurationModel} setDataObject={setTerraformStepConfigurationModel} />
  //         <TerraformS3BucketRegionSelectInput dataObject={terraformStepConfigurationModel} setDataObject={setTerraformStepConfigurationModel} fieldName="bucketRegion" />
  //       </>
  //     );
  //   }
  // };
 
  if (isLoading || terraformStepConfigurationModel == null) {
    return <DetailPanelLoadingDialog />;
  }
  
  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={terraformStepConfigurationModel}
      persistRecord={callbackFunction}
      isLoading={isLoading}
    >
      <TerraformJobTypeSelectInput dataObject={terraformStepConfigurationModel} setDataObject={setTerraformStepConfigurationModel} />
      <TerraformScmToolTypeSelectInput model={terraformStepConfigurationModel} setModel={setTerraformStepConfigurationModel} />
      <TerraformScmToolSelectInput model={terraformStepConfigurationModel} setModel={setTerraformStepConfigurationModel} />
      <TerraformBitbucketWorkspaceSelectInput model={terraformStepConfigurationModel} setModel={setTerraformStepConfigurationModel} />
      <TerraformGitRepositorySelectInput model={terraformStepConfigurationModel} setModel={setTerraformStepConfigurationModel} />
      <TerraformGitBranchSelectInput model={terraformStepConfigurationModel} setModel={setTerraformStepConfigurationModel} />
      <TextInputBase dataObject={terraformStepConfigurationModel} fieldName={"gitFilePath"} setDataObject={setTerraformStepConfigurationModel}/>
      <TerraformTagSelectInput model={terraformStepConfigurationModel} setModel={setTerraformStepConfigurationModel} />
      <CustomScriptSubForm model={terraformStepConfigurationModel} setModel={setTerraformStepConfigurationModel} />
      <TerraformCloudProviderSelectInput dataObject={terraformStepConfigurationModel} setDataObject={setTerraformStepConfigurationModel} fieldName={"cloudProvider"} />
      <CloudCredentialSubForm model={terraformStepConfigurationModel} setModel={setTerraformStepConfigurationModel} />
      <TerraformStateSubForm model={terraformStepConfigurationModel} setModel={setTerraformStepConfigurationModel} />      
      <TerraformCustomParametersInput
        model={terraformStepConfigurationModel}
        setModel={setTerraformStepConfigurationModel}
        fieldName={"saveEnvironmentVariables"}
      />
      <TerraformCustomParametersInput
        model={terraformStepConfigurationModel}
        setModel={setTerraformStepConfigurationModel}
        fieldName={"saveParameters"}
      />
      {/*<TerraformStoreStateInS3Toggle dataObject={terraformStepConfigurationModel} setDataObject={setTerraformStepConfigurationModel} fieldName="storeStateInBucket" />*/}
      {/*{getS3BucketFields()}*/}
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
