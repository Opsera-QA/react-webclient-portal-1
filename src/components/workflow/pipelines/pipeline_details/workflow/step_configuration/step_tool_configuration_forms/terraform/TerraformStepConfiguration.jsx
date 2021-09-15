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
import TerraformAwsCredentialsSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformAwsCredentialsSelectInput";
import terraformStepFormMetadata from "./terraform-stepForm-metadata";
import TerraformCustomParametersInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformCustomParametersInput";
import TerraformRuntimeArgsInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformRuntimeArgsInput";
import TerraformIamRolesSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformIamRolesSelectInput";
import TerraformIAmRoleFlagToggleInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformIAmRoleFlagToggleInput";
import TerraformStoreStateInS3Toggle from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformStoreStateInS3Toggle";
import TerraformS3BucketSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformS3BucketSelectInput";
import TerraformS3BucketRegionSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformS3BucketRegionSelectInput";

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

  const getIamRoleFields = () => {
    if (terraformStepConfigurationModel?.getData('iamRoleFlag') === true) {
      return (
        <TerraformIamRolesSelectInput
          model={terraformStepConfigurationModel}
          setModel={setTerraformStepConfigurationModel}
          disabled={terraformStepConfigurationModel?.getData("awsToolConfigId").length === 0}
          toolConfigId={terraformStepConfigurationModel?.getData("awsToolConfigId")}
        />
      );
    }

    return (
      <>
        <TextInputBase dataObject={terraformStepConfigurationModel} setDataObject={setTerraformStepConfigurationModel} fieldName={"accessKeyParamName"} />
        <TextInputBase dataObject={terraformStepConfigurationModel} setDataObject={setTerraformStepConfigurationModel} fieldName={"secretKeyParamName"} />
        <TextInputBase dataObject={terraformStepConfigurationModel} setDataObject={setTerraformStepConfigurationModel} fieldName={"regionParamName"} />
      </>
    );
  };

  const getS3BucketFields = () => {
    if(terraformStepConfigurationModel?.getData('storeStateInBucket')) {
      return (
        <>
          <TerraformS3BucketSelectInput dataObject={terraformStepConfigurationModel} setDataObject={setTerraformStepConfigurationModel} />
          <TerraformS3BucketRegionSelectInput dataObject={terraformStepConfigurationModel} setDataObject={setTerraformStepConfigurationModel} fieldName="bucketRegion" />
        </>
      );
    }
  };
 
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
      <TerraformAwsCredentialsSelectInput model={terraformStepConfigurationModel} setModel={setTerraformStepConfigurationModel} />
      <TerraformIAmRoleFlagToggleInput model={terraformStepConfigurationModel} setModel={setTerraformStepConfigurationModel} />
      {getIamRoleFields()}
      <TerraformRuntimeArgsInput dataObject={terraformStepConfigurationModel} setDataObject={setTerraformStepConfigurationModel} />
      <TerraformCustomParametersInput
        model={terraformStepConfigurationModel}
        setModel={setTerraformStepConfigurationModel}
      />
      <TerraformStoreStateInS3Toggle dataObject={terraformStepConfigurationModel} setDataObject={setTerraformStepConfigurationModel} fieldName="storeStateInBucket" />
      {getS3BucketFields()}
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
