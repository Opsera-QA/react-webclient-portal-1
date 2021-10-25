import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import PropTypes from "prop-types";
import dotNetCliStepFormMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/dotnetcli/dotnet-cli-stepForm-metadata";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import DotNetCliStepJenkinsToolSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/dotnetcli/inputs/DotNetCliStepJenkinsToolSelectInput";
import DotNetCliStepJenkinsJobSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/dotnetcli/inputs/DotNetCliStepJenkinsJobSelectInput";
import modelHelpers from "components/common/model/modelHelpers";
import DotNetJenkinsAccountInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/dotnetcli/inputs/DotNetJenkinsAccountInput";
import DotNetGitRepositoryInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/dotnetcli/inputs/DotNetGitRepositoryInput";
import DotNetGitBranchInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/dotnetcli/inputs/DotNetGitBranchInput";
import DotNetBitbucketWorkspaceInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/dotnetcli/inputs/DotNetBitbucketWorkspaceInput";
import WorkspaceDeleteToggleInput from "./inputs/WorkspaceDeleteToggleInput";
import ParameterSelectListInputBase
  from "components/common/list_of_values_input/parameters/ParameterSelectListInputBase";
import DotNetCliTypeSelectInput from "./inputs/DotNetCliTypeSelectInput";
import DotNetCliSdkVersionSelectInput from "./inputs/DotNetCliSdkVersionSelectInput";

function DotNetCliStepConfiguration({ pipelineId, stepTool, stepId, createJob, closeEditorPanel }) {
  const [isLoading, setIsLoading] = useState(false);
  const [jobType, setJobType] = useState("");
  const [dotNetCliStepConfigurationDto, setDotNetCliStepConfigurationDataDto] = useState(undefined);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");


  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    let { threshold, job_type } = stepTool;
    let dotNetCliConfigurationData = modelHelpers.getPipelineStepConfigurationModel(stepTool, dotNetCliStepFormMetadata);

    setDotNetCliStepConfigurationDataDto(dotNetCliConfigurationData);

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
    const toolId = dotNetCliStepConfigurationDto.getData("toolConfigId");
    console.log("saving and creating job for toolID: ", toolId);
    if (toolId) {
      // setLoading(true);

      const createJobPostBody = {
        jobId: "",
        pipelineId: pipelineId,
        stepId: stepId,
      };

      const toolConfiguration = {
        configuration: dotNetCliStepConfigurationDto.getPersistData(),
        threshold: {
          type: thresholdType,
          value: thresholdVal,
        },
        job_type: dotNetCliStepConfigurationDto.getData("jobType"),
      };

      await createJob(toolId, toolConfiguration, stepId, createJobPostBody);
    }
  };

  if (isLoading || dotNetCliStepConfigurationDto == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={dotNetCliStepConfigurationDto}
      persistRecord={handleCreateAndSave}
      isLoading={isLoading}
    >
      <DotNetCliStepJenkinsToolSelectInput dataObject={dotNetCliStepConfigurationDto} setDataObject={setDotNetCliStepConfigurationDataDto} />
      <DotNetCliStepJenkinsJobSelectInput dataObject={dotNetCliStepConfigurationDto} setDataObject={setDotNetCliStepConfigurationDataDto}/>
      <DotNetJenkinsAccountInput dataObject={dotNetCliStepConfigurationDto} setDataObject={setDotNetCliStepConfigurationDataDto} />
      <DotNetBitbucketWorkspaceInput dataObject={dotNetCliStepConfigurationDto} setDataObject={setDotNetCliStepConfigurationDataDto} />
      <DotNetGitRepositoryInput dataObject={dotNetCliStepConfigurationDto} setDataObject={setDotNetCliStepConfigurationDataDto} />
      <DotNetGitBranchInput  dataObject={dotNetCliStepConfigurationDto} setDataObject={setDotNetCliStepConfigurationDataDto} />
      <WorkspaceDeleteToggleInput dataObject={dotNetCliStepConfigurationDto} setDataObject={setDotNetCliStepConfigurationDataDto} fieldName={"workspaceDeleteFlag"} />
      <DotNetCliTypeSelectInput dataObject={dotNetCliStepConfigurationDto} setDataObject={setDotNetCliStepConfigurationDataDto} fieldName={"dotnetType"}  />
      {dotNetCliStepConfigurationDto?.getData("dotnetType") && 
        <DotNetCliSdkVersionSelectInput dataObject={dotNetCliStepConfigurationDto} setDataObject={setDotNetCliStepConfigurationDataDto} />
      }
      <TextAreaInput 
        dataObject={dotNetCliStepConfigurationDto}                         
        setDataObject={setDotNetCliStepConfigurationDataDto}
        fieldName={"commands"} 
      />
      <ParameterSelectListInputBase
        dataObject={dotNetCliStepConfigurationDto}
        setDataObject={setDotNetCliStepConfigurationDataDto}
        fieldName={"customParameters"}
        allowIncompleteItems={true}
        type={"Parameter"}
        regexValidationRequired={false}
        titleText={"Parameter Selection"}
      />
      <TextInputBase setDataObject={setDotNetCliStepConfigurationDataDto} dataObject={dotNetCliStepConfigurationDto} fieldName={"outputPath"} />
      <TextInputBase setDataObject={setDotNetCliStepConfigurationDataDto} dataObject={dotNetCliStepConfigurationDto} fieldName={"outputFileName"} />
    </PipelineStepEditorPanelContainer>
  );
}

DotNetCliStepConfiguration.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  createJob: PropTypes.func,
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func
};

export default DotNetCliStepConfiguration;
