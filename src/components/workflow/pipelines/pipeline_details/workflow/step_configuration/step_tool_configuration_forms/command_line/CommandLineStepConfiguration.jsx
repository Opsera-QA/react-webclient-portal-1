import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import commandLineStepFormMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/command_line/commandline-stepForm-metadata";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import CommandLineStepJenkinsToolSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/command_line/inputs/CommandLineStepJenkinsToolSelectInput";
import CommandLineStepJenkinsJobSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/command_line/inputs/CommandLineStepJenkinsJobSelectInput";
import modelHelpers from "components/common/model/modelHelpers";
import CommandLineJenkinsAccountInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/command_line/inputs/CommandLineJenkinsAccountInput";
import CommandLineGitRepositoryInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/command_line/inputs/CommandLineGitRepositoryInput";
import CommandLineGitBranchInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/command_line/inputs/CommandLineGitBranchInput";
import CommandLineBitbucketWorkspaceInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/command_line/inputs/CommandLineBitbucketWorkspaceInput";
import CommandLineDependencyTypeInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/command_line/inputs/CommandLineDependencyTypeInput";
import AgentLabelsSelectInput from "components/common/list_of_values_input/workflow/pipelines/AgentLabelsSelectInput";
import CommandLineSourceScriptToggleInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/command_line/inputs/CommandLineSourceScriptToggleInput";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import WorkspaceDeleteToggleInput from "./inputs/WorkspaceDeleteToggleInput";
import StepConfigTerraformStepSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/common/inputs/StepConfigTerraformStepSelectInput";
import { faHandshake } from "@fortawesome/pro-light-svg-icons";
import ParameterSelectListInputBase
  from "../../../../../../../common/list_of_values_input/parameters/ParameterSelectListInputBase";
import StepConfigUseTerraformOutput from "../common/inputs/StepConfigUseTerraformOutput";


function CommandLineStepConfiguration({ pipelineId, stepTool, stepId, createJob, closeEditorPanel, plan }) {
  const [isLoading, setIsLoading] = useState(false);
  const [jobType, setJobType] = useState("");
  const [commandLineStepConfigurationDto, setCommandLineStepConfigurationDataDto] = useState(undefined);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");


  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    let { threshold, job_type } = stepTool;
    let commandLineConfigurationData = modelHelpers.getPipelineStepConfigurationModel(stepTool, commandLineStepFormMetadata);

    if (commandLineConfigurationData.getData("sourceScript") === true) {
      commandLineConfigurationData.setMetaDataFields(commandLineStepFormMetadata.fieldsAlt);
    }

    setCommandLineStepConfigurationDataDto(commandLineConfigurationData);

    if (job_type) {
      setJobType(job_type);
    }

    if (threshold) {
      setThresholdType(threshold?.type);
      setThresholdValue(threshold?.value);
    }

    setIsLoading(false);
  };

  const getDynamicFields = () => {
    if (commandLineStepConfigurationDto.getData("sourceScript") === true) {
      return (
        <div>
          <TextInputBase fieldName={"scriptFilePath"} dataObject={commandLineStepConfigurationDto} setDataObject={setCommandLineStepConfigurationDataDto} />
          <TextInputBase fieldName={"scriptFileName"} dataObject={commandLineStepConfigurationDto} setDataObject={setCommandLineStepConfigurationDataDto} />
        </div>
      );
    }
    return (<TextAreaInput dataObject={commandLineStepConfigurationDto} fieldName={"commands"} setDataObject={setCommandLineStepConfigurationDataDto}/>);
  };

  const getTerraformSelect = () => {
    if (commandLineStepConfigurationDto?.getData("useTerraformOutput")) {
      return (
        <StepConfigTerraformStepSelectInput setDataObject={setCommandLineStepConfigurationDataDto} dataObject={commandLineStepConfigurationDto} plan={plan} stepId={stepId} />
      );
    }
  };

  const handleCreateAndSave = async () => {
    const toolId = commandLineStepConfigurationDto.getData("toolConfigId");
    console.log("saving and creating job for toolID: ", toolId);
    if (toolId) {
      // setLoading(true);

      const createJobPostBody = {
        jobId: "",
        pipelineId: pipelineId,
        stepId: stepId,
      };
      console.log("createJobPostBody: ", createJobPostBody);

      const toolConfiguration = {
        configuration: commandLineStepConfigurationDto.getPersistData(),
        threshold: {
          type: thresholdType,
          value: thresholdVal,
        },
        job_type: commandLineStepConfigurationDto.getData("jobType"),
      };
      console.log("item: ", toolConfiguration);

      await createJob(toolId, toolConfiguration, stepId, createJobPostBody);
    }
  };

  if (isLoading || commandLineStepConfigurationDto == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={commandLineStepConfigurationDto}
      persistRecord={handleCreateAndSave}
      isLoading={isLoading}
    >
      <CommandLineStepJenkinsToolSelectInput
        model={commandLineStepConfigurationDto}
        setModel={setCommandLineStepConfigurationDataDto}
      />
      <CommandLineStepJenkinsJobSelectInput
        model={commandLineStepConfigurationDto}
        setModel={setCommandLineStepConfigurationDataDto}
      />
      <CommandLineJenkinsAccountInput dataObject={commandLineStepConfigurationDto} setDataObject={setCommandLineStepConfigurationDataDto} />
      <CommandLineBitbucketWorkspaceInput dataObject={commandLineStepConfigurationDto} setDataObject={setCommandLineStepConfigurationDataDto} />
      <CommandLineGitRepositoryInput dataObject={commandLineStepConfigurationDto} setDataObject={setCommandLineStepConfigurationDataDto} />
      <CommandLineGitBranchInput  dataObject={commandLineStepConfigurationDto} setDataObject={setCommandLineStepConfigurationDataDto} />
      {/* <AgentLabelsSelectInput
        dataObject={commandLineStepConfigurationDto}
        fieldName={"agentLabels"}
        setDataObject={setCommandLineStepConfigurationDataDto}
      /> */}
      <CommandLineSourceScriptToggleInput dataObject={commandLineStepConfigurationDto} setDataObject={setCommandLineStepConfigurationDataDto} fieldName={"sourceScript"}/>
      <StepConfigUseTerraformOutput dataObject={commandLineStepConfigurationDto} setDataObject={setCommandLineStepConfigurationDataDto} fieldName={"useTerraformOutput"} plan={plan} stepId={stepId}/>
      {getTerraformSelect()}
      <ParameterSelectListInputBase
        titleIcon={faHandshake}
        dataObject={commandLineStepConfigurationDto}
        setDataObject={setCommandLineStepConfigurationDataDto}
        fieldName={"customParameters"}
        allowIncompleteItems={true}
        type={"Parameter"}
        regexValidationRequired={false}
        titleText={"Parameter Selection"}
        plan={plan}
        tool_prop={commandLineStepConfigurationDto?.getData("terraformStepId") && commandLineStepConfigurationDto?.getData("terraformStepId").length > 0 ?
          commandLineStepConfigurationDto?.getData("terraformStepId") : ""}
      />
      {getDynamicFields()}
      <CommandLineDependencyTypeInput dataObject={commandLineStepConfigurationDto} setDataObject={setCommandLineStepConfigurationDataDto} />
      <TextInputBase setDataObject={setCommandLineStepConfigurationDataDto} dataObject={commandLineStepConfigurationDto} fieldName={"outputPath"} />
      <TextInputBase setDataObject={setCommandLineStepConfigurationDataDto} dataObject={commandLineStepConfigurationDto} fieldName={"outputFileName"} />
      <WorkspaceDeleteToggleInput dataObject={commandLineStepConfigurationDto} setDataObject={setCommandLineStepConfigurationDataDto} fieldName={"workspaceDeleteFlag"} />
    </PipelineStepEditorPanelContainer>
  );
}

CommandLineStepConfiguration.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  createJob: PropTypes.func,
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func,
  plan: PropTypes.array
};

export default CommandLineStepConfiguration;
