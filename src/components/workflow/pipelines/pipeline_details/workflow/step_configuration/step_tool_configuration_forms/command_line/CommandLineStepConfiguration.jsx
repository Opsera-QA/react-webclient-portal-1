import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
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
import CommandLineSourceScriptToggleInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/command_line/inputs/CommandLineSourceScriptToggleInput";
import WorkspaceDeleteToggleInput from "./inputs/WorkspaceDeleteToggleInput";
import StepConfigTerraformStepSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/common/inputs/StepConfigTerraformStepSelectInput";
import { faHandshake } from "@fortawesome/pro-light-svg-icons";
import ParameterSelectListInputBase
  from "../../../../../../../common/list_of_values_input/parameters/ParameterSelectListInputBase";
import StepConfigUseTerraformOutput from "../common/inputs/StepConfigUseTerraformOutput";
import CommandLineSonarScannerToggleInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/command_line/inputs/CommandLineSonarScannerToggleInput";
import RoleRestrictedSonarToolSelectInput
  from "components/common/list_of_values_input/tools/sonar/tool/RoleRestrictedSonarToolSelectInput";
import CommandLineSonarCustomParametersToggle from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/command_line/inputs/CommandLineSonarCustomParametersToggle";
import CommandLineInputParametersInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/command_line/inputs/parameters/CommandLineInputParametersInput";
import LocalInputParametersInputBase
  from "components/common/list_of_values_input/parameters/local/LocalInputParametersInputBase";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import CommandLineInputParameterInputBase
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/command_line/inputs/parameters/CommandLineInputParameterInputBase";

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

  const getSonarScannerInputFields = () => {
    if (commandLineStepConfigurationDto.getData("sonarScanFlag") === true) {
      return (
        <div>
          <RoleRestrictedSonarToolSelectInput fieldName={"sonarToolConfigId"} model={commandLineStepConfigurationDto} setModel={setCommandLineStepConfigurationDataDto} />
          <TextInputBase fieldName={"projectKey"} dataObject={commandLineStepConfigurationDto} setDataObject={setCommandLineStepConfigurationDataDto} />
          <CommandLineSonarCustomParametersToggle
            model={commandLineStepConfigurationDto}
            setModel={setCommandLineStepConfigurationDataDto}
          />
        </div>
      );
    }
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
    // console.log("saving and creating job for toolID: ", toolId);
    if (toolId) {
      // setLoading(true);

      const createJobPostBody = {
        jobId: "",
        pipelineId: pipelineId,
        stepId: stepId,
      };
      // console.log("createJobPostBody: ", createJobPostBody);

      const toolConfiguration = {
        configuration: commandLineStepConfigurationDto.getPersistData(),
        threshold: {
          type: thresholdType,
          value: thresholdVal,
        },
        job_type: commandLineStepConfigurationDto.getData("jobType"),
      };
      // console.log("item: ", toolConfiguration);

      await createJob(toolId, toolConfiguration, stepId, createJobPostBody);
    }
  };

  if (isLoading || commandLineStepConfigurationDto == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <EditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={commandLineStepConfigurationDto}
      createRecord={handleCreateAndSave}
      updateRecord={handleCreateAndSave}
      lenient={true}
      isLoading={isLoading}
      className={"m-0"}
      addAnotherOption={false}
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
      <WorkspaceDeleteToggleInput dataObject={commandLineStepConfigurationDto} setDataObject={setCommandLineStepConfigurationDataDto} fieldName={"workspaceDeleteFlag"} />
      {/* <AgentLabelsSelectInput
        dataObject={commandLineStepConfigurationDto}
        fieldName={"agentLabels"}
        setDataObject={setCommandLineStepConfigurationDataDto}
      /> */}
      <CommandLineSourceScriptToggleInput dataObject={commandLineStepConfigurationDto} setDataObject={setCommandLineStepConfigurationDataDto} fieldName={"sourceScript"}/>
      <StepConfigUseTerraformOutput dataObject={commandLineStepConfigurationDto} setDataObject={setCommandLineStepConfigurationDataDto} fieldName={"useTerraformOutput"} plan={plan} stepId={stepId}/>
      {getTerraformSelect()}
      {getDynamicFields()}
      <CommandLineInputParametersInput
        model={commandLineStepConfigurationDto}
        setModel={setCommandLineStepConfigurationDataDto}
        plan={plan}
      />
      {/*<LocalInputParametersInputBase*/}
      {/*  model={commandLineStepConfigurationDto}*/}
      {/*  setModel={setCommandLineStepConfigurationDataDto}*/}
      {/*  fieldName={"stepParameters"}*/}
      {/*/>*/}
      {/*<CommandLineInputParameterInputBase*/}
      {/*  model={commandLineStepConfigurationDto}*/}
      {/*  setModel={setCommandLineStepConfigurationDataDto}*/}
      {/*  plan={plan}*/}
      {/*/>*/}
      <ParameterSelectListInputBase
        titleIcon={faHandshake}
        dataObject={commandLineStepConfigurationDto}
        setDataObject={setCommandLineStepConfigurationDataDto}
        fieldName={"outputCustomParameters"}
        allowIncompleteItems={true}
        type={"Parameter"}
        regexValidationRequired={false}
        titleText={"Output Parameters"}
        plan={plan}
        tool_prop={commandLineStepConfigurationDto?.getData("terraformStepId") && commandLineStepConfigurationDto?.getData("terraformStepId").length > 0 ?
          commandLineStepConfigurationDto?.getData("terraformStepId") : ""}
      />
      <TextInputBase setDataObject={setCommandLineStepConfigurationDataDto} dataObject={commandLineStepConfigurationDto} fieldName={"outputPath"} />
      <TextInputBase setDataObject={setCommandLineStepConfigurationDataDto} dataObject={commandLineStepConfigurationDto} fieldName={"outputFileName"} />
      <CommandLineDependencyTypeInput dataObject={commandLineStepConfigurationDto} setDataObject={setCommandLineStepConfigurationDataDto} />
      <CommandLineSonarScannerToggleInput dataObject={commandLineStepConfigurationDto} setDataObject={setCommandLineStepConfigurationDataDto} fieldName={"sonarScanFlag"} />
      {getSonarScannerInputFields()}
    </EditorPanelContainer>
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
