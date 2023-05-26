import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import PropTypes from "prop-types";
import commandLineStepFormMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/command_line/commandline-stepForm-metadata";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import CommandLineStepJenkinsJobSelectInput
  from "components/workflow/plan/step/command_line_v2/inputs/CommandLineStepJenkinsJobSelectInput";
import modelHelpers from "components/common/model/modelHelpers";
import CommandLineJenkinsAccountInput
  from "components/workflow/plan/step/command_line_v2/inputs/CommandLineJenkinsAccountInput";
import CommandLineGitRepositoryInput
  from "components/workflow/plan/step/command_line_v2/inputs/CommandLineGitRepositoryInput";
import CommandLineGitBranchInput
  from "components/workflow/plan/step/command_line_v2/inputs/CommandLineGitBranchInput";
import CommandLineBitbucketWorkspaceInput
  from "components/workflow/plan/step/command_line_v2/inputs/CommandLineBitbucketWorkspaceInput";
import CommandLineDependencyTypeInput
  from "components/workflow/plan/step/command_line_v2/inputs/CommandLineDependencyTypeInput";
import CommandLineSourceScriptToggleInput
  from "components/workflow/plan/step/command_line_v2/inputs/CommandLineSourceScriptToggleInput";
import StepConfigTerraformStepSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/common/inputs/StepConfigTerraformStepSelectInput";
import { faHandshake } from "@fortawesome/pro-light-svg-icons";
import ParameterSelectListInputBase
  from "components/common/list_of_values_input/parameters/legacy/ParameterSelectListInputBase";
import CommandLineSonarScannerToggleInput from "components/workflow/plan/step/command_line_v2/inputs/CommandLineSonarScannerToggleInput";
import RoleRestrictedSonarToolSelectInput
  from "components/common/list_of_values_input/tools/sonar/tool/RoleRestrictedSonarToolSelectInput";
import CommandLineSonarCustomParametersToggle from "components/workflow/plan/step/command_line_v2/inputs/CommandLineSonarCustomParametersToggle";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import PipelineStepParameterInputBase
  from "components/common/list_of_values_input/parameters/pipeline/PipelineStepParameterInputBase";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import CommandLineStepJenkinsToolSelectInput
  from "components/workflow/plan/step/command_line_v2/inputs/CommandLineStepJenkinsToolSelectInput";
import StepConfigUseTerraformOutput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/common/inputs/StepConfigUseTerraformOutput";

// TODO: This is largely just copied from the V1 step and needs to be rewritten
function CommandLineStepV2EditorPanel(
  {
    pipelineId,
    stepTool,
    stepId,
    createJob,
    closeEditorPanel,
    plan,
  }) {
  const [isLoading, setIsLoading] = useState(false);
  const [commandLineStepConfigurationDto, setCommandLineStepConfigurationDataDto] = useState(undefined);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    let { threshold } = stepTool;
    let commandLineConfigurationData = modelHelpers.getPipelineStepConfigurationModel(stepTool, commandLineStepFormMetadata);

    if (commandLineConfigurationData.getData("sourceScript") === true) {
      commandLineConfigurationData.setMetaDataFields(commandLineStepFormMetadata.fieldsAlt);
    }

    setCommandLineStepConfigurationDataDto(commandLineConfigurationData);

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
      <BooleanToggleInput
        dataObject={commandLineStepConfigurationDto}
        setDataObject={setCommandLineStepConfigurationDataDto}
        fieldName={"workspaceDeleteFlag"}
      />
      {/* <AgentLabelsSelectInput
        dataObject={commandLineStepConfigurationDto}
        fieldName={"agentLabels"}
        setDataObject={setCommandLineStepConfigurationDataDto}
      /> */}
      <CommandLineSourceScriptToggleInput dataObject={commandLineStepConfigurationDto} setDataObject={setCommandLineStepConfigurationDataDto} fieldName={"sourceScript"}/>
      <StepConfigUseTerraformOutput
        dataObject={commandLineStepConfigurationDto}
        setDataObject={setCommandLineStepConfigurationDataDto}
        fieldName={"useTerraformOutput"}
        plan={plan}
        stepId={stepId}
      />
      {getTerraformSelect()}
      {getDynamicFields()}
      <PipelineStepParameterInputBase
        model={commandLineStepConfigurationDto}
        setModel={setCommandLineStepConfigurationDataDto}
        plan={plan}
        showSaveEnvironmentVariablesToggle={true}
        allowLocalParameters={true}
        allowTerraformParametersSync={true}
        saveEnvironmentVariables={commandLineStepConfigurationDto?.getData("saveEnvironmentVariables") === true}
        allowParameterMapping={true}
      />
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

CommandLineStepV2EditorPanel.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  createJob: PropTypes.func,
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func,
  plan: PropTypes.array
};

export default CommandLineStepV2EditorPanel;
