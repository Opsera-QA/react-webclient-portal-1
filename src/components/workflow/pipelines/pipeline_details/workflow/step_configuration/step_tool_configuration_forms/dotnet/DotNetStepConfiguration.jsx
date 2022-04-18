import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import PropTypes from "prop-types";
import dotNetStepFormMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/dotnet/dotnet-stepForm-metadata";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import DotNetStepJenkinsToolSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/dotnet/inputs/DotNetStepJenkinsToolSelectInput";
import DotNetStepJenkinsJobSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/dotnet/inputs/DotNetStepJenkinsJobSelectInput";
import modelHelpers from "components/common/model/modelHelpers";
import DotNetJenkinsAccountInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/dotnet/inputs/DotNetJenkinsAccountInput";
import DotNetGitRepositoryInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/dotnet/inputs/DotNetGitRepositoryInput";
import DotNetGitBranchInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/dotnet/inputs/DotNetGitBranchInput";
import DotNetBitbucketWorkspaceInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/dotnet/inputs/DotNetBitbucketWorkspaceInput";
import WorkspaceDeleteToggleInput from "./inputs/WorkspaceDeleteToggleInput";
import ScriptLibrarySelectInput
  from "components/common/list_of_values_input/inventory/scripts/ScriptLibrarySelectInput";
import ParameterSelectListInputBase
  from "components/common/list_of_values_input/parameters/ParameterSelectListInputBase";

function DotNetStepConfiguration({ pipelineId, stepTool, stepId, createJob, closeEditorPanel }) {
  const [isLoading, setIsLoading] = useState(false);
  const [jobType, setJobType] = useState("");
  const [dotNetStepConfigurationDto, setDotNetStepConfigurationDataDto] = useState(undefined);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");


  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    let { threshold, job_type } = stepTool;
    let dotNetConfigurationData = modelHelpers.getPipelineStepConfigurationModel(stepTool, dotNetStepFormMetadata);

    setDotNetStepConfigurationDataDto(dotNetConfigurationData);

    if (job_type) {
      setJobType(job_type);
    }

    if (threshold) {
      setThresholdType(threshold?.type);
      setThresholdValue(threshold?.value);
    }

    setIsLoading(false);
  };

  const handleCreateAndSave = async () => {
    const toolId = dotNetStepConfigurationDto.getData("toolConfigId");
    console.log("saving and creating job for toolID: ", toolId);
    if (toolId) {
      // setLoading(true);

      const createJobPostBody = {
        jobId: "",
        pipelineId: pipelineId,
        stepId: stepId,
      };

      const toolConfiguration = {
        configuration: dotNetStepConfigurationDto.getPersistData(),
        threshold: {
          type: thresholdType,
          value: thresholdVal,
        },
        job_type: dotNetStepConfigurationDto.getData("jobType"),
      };

      await createJob(toolId, toolConfiguration, stepId, createJobPostBody);
    }
  };

  if (isLoading || dotNetStepConfigurationDto == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={dotNetStepConfigurationDto}
      persistRecord={handleCreateAndSave}
      isLoading={isLoading}
    >
      <DotNetStepJenkinsToolSelectInput
        dataObject={dotNetStepConfigurationDto}
        setDataObject={setDotNetStepConfigurationDataDto}
      />
      <DotNetStepJenkinsJobSelectInput
        model={dotNetStepConfigurationDto}
        setModel={setDotNetStepConfigurationDataDto}
      />
      <DotNetJenkinsAccountInput dataObject={dotNetStepConfigurationDto} setDataObject={setDotNetStepConfigurationDataDto} />
      <DotNetBitbucketWorkspaceInput dataObject={dotNetStepConfigurationDto} setDataObject={setDotNetStepConfigurationDataDto} />
      <DotNetGitRepositoryInput dataObject={dotNetStepConfigurationDto} setDataObject={setDotNetStepConfigurationDataDto} />
      <DotNetGitBranchInput  dataObject={dotNetStepConfigurationDto} setDataObject={setDotNetStepConfigurationDataDto} />
      <WorkspaceDeleteToggleInput dataObject={dotNetStepConfigurationDto} setDataObject={setDotNetStepConfigurationDataDto} fieldName={"workspaceDeleteFlag"} />
      <TextAreaInput 
        dataObject={dotNetStepConfigurationDto}                         
        setDataObject={setDotNetStepConfigurationDataDto}
        fieldName={"commandLineArguments"} 
      />
      <ParameterSelectListInputBase
        dataObject={dotNetStepConfigurationDto}
        setDataObject={setDotNetStepConfigurationDataDto}
        fieldName={"customParameters"}
        allowIncompleteItems={true}
        type={"Parameter"}
        regexValidationRequired={false}
        titleText={"Parameter Selection"}
      />
      <ScriptLibrarySelectInput
        fieldName={"scriptId"}
        model={dotNetStepConfigurationDto}
        setModel={setDotNetStepConfigurationDataDto}
        busy={isLoading}
        disabled={isLoading}
      />
      <TextInputBase setDataObject={setDotNetStepConfigurationDataDto} dataObject={dotNetStepConfigurationDto} fieldName={"outputPath"} />
      <TextInputBase setDataObject={setDotNetStepConfigurationDataDto} dataObject={dotNetStepConfigurationDto} fieldName={"outputFileName"} />
      <TextInputBase setDataObject={setDotNetStepConfigurationDataDto} dataObject={dotNetStepConfigurationDto} fieldName={"solutionFilePath"} />
      <TextInputBase setDataObject={setDotNetStepConfigurationDataDto} dataObject={dotNetStepConfigurationDto} fieldName={"solutionFileName"} />
    </PipelineStepEditorPanelContainer>
  );
}

DotNetStepConfiguration.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  createJob: PropTypes.func,
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func
};

export default DotNetStepConfiguration;
