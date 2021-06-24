import React, {useContext, useEffect, useRef, useState} from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import TerraformJobTypeSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformJobTypeSelectInput";
import TerraformScmToolTypeSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformScmToolTypeSelectInput";
import TerraformScmToolSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformScmToolSelectInput";
import TerraformBitbucketWorkspaceInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformBitbucketWorkspaceInput";
import TerraformGitRepositoryInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformGitRepositoryInput";
import TerraformGitBranchInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformGitBranchInput";
import TerraformAwsCredentialsSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformAwsCredentialsSelectInput";
import terraformStepFormMetadata from "./terraform-stepForm-metadata";
import TerraformRuntimeArgumentsInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformRuntimeArgumentsInput";
import {DialogToastContext} from "contexts/DialogToastContext";
import TerraformCustomParametersInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformCustomParametersInput";

function TerraformStepConfiguration({ pipelineId, stepTool, stepId, createJob, closeEditorPanel, parentCallback }) {
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [jobType, setJobType] = useState("");
  const [terraformStepConfigurationDto, setTerraformStepConfigurationDataDto] = useState(undefined);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    loadData();

    return () => {
      isMounted.current = false;
    };
  }, []);

  const loadData = () => {

    try {
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
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
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
      <TerraformScmToolTypeSelectInput dataObject={terraformStepConfigurationDto} setDataObject={setTerraformStepConfigurationDataDto} />
      <TerraformScmToolSelectInput
        dataObject={terraformStepConfigurationDto}
        setDataObject={setTerraformStepConfigurationDataDto}
        type={terraformStepConfigurationDto?.getData("type")}
      />
      <TerraformBitbucketWorkspaceInput dataObject={terraformStepConfigurationDto} setDataObject={setTerraformStepConfigurationDataDto} />
      <TerraformGitRepositoryInput dataObject={terraformStepConfigurationDto} setDataObject={setTerraformStepConfigurationDataDto} />
      <TerraformGitBranchInput  dataObject={terraformStepConfigurationDto} setDataObject={setTerraformStepConfigurationDataDto} />
      <TextInputBase dataObject={terraformStepConfigurationDto} fieldName={"gitFilePath"} setDataObject={setTerraformStepConfigurationDataDto}/>
      <TerraformAwsCredentialsSelectInput dataObject={terraformStepConfigurationDto} setDataObject={setTerraformStepConfigurationDataDto}/>
      <TextInputBase dataObject={terraformStepConfigurationDto} setDataObject={setTerraformStepConfigurationDataDto} fieldName={"accessKeyParamName"} />
      <TextInputBase dataObject={terraformStepConfigurationDto} setDataObject={setTerraformStepConfigurationDataDto} fieldName={"secretKeyParamName"} />
      <TextInputBase dataObject={terraformStepConfigurationDto} setDataObject={setTerraformStepConfigurationDataDto} fieldName={"regionParamName"} />
      <TerraformRuntimeArgumentsInput dataObject={terraformStepConfigurationDto} setDataObject={setTerraformStepConfigurationDataDto} />
      <TerraformCustomParametersInput
        model={terraformStepConfigurationDto}
        setModel={setTerraformStepConfigurationDataDto}
        fieldName={"saveParameters"}
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
