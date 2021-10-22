import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import terrascanStepFormMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terrascan/terrascan-stepForm-metadata";
import TerrascanJenkinsToolSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terrascan/inputs/TerrascanJenkinsToolSelectInput";
import TerrascanStepJenkinsJobSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terrascan/inputs/TerrascanStepJenkinsJobSelectInput";
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
import WorkspaceDeleteToggleInput from "./inputs/WorkspaceDeleteToggleInput";
import TerrascanPlatformSelectInput from "./inputs/TerrascanPlatformSelectInput";
import TerrascanRulesInput from "./inputs/TerrascanRulesInput";
import TextInputBase from "../../../../../../../common/inputs/text/TextInputBase";

function TerrascanStepConfiguration({ pipelineId, stepTool, stepId, createJob, closeEditorPanel }) {
  const [isLoading, setIsLoading] = useState(false);
  const [jobType, setJobType] = useState("");
  const [terrascanStepConfigurationDto, setTerrascanStepConfigurationDataDto] = useState(undefined);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    let { threshold, job_type } = stepTool;
    let terrascanConfigurationData = modelHelpers.getPipelineStepConfigurationModel(stepTool, terrascanStepFormMetadata);

    setTerrascanStepConfigurationDataDto(terrascanConfigurationData);

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
    const toolId = terrascanStepConfigurationDto.getData("toolConfigId");
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
        configuration: terrascanStepConfigurationDto.getPersistData(),
        threshold: {
          type: thresholdType,
          value: thresholdVal,
        },
        job_type: terrascanStepConfigurationDto.getData("jobType"),
      };
      console.log("item: ", toolConfiguration);

      await createJob(toolId, toolConfiguration, stepId, createJobPostBody);
    }
  };

  if (isLoading || terrascanStepConfigurationDto == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={terrascanStepConfigurationDto}
      persistRecord={handleCreateAndSave}
      isLoading={isLoading}
    >
      <TerrascanJenkinsToolSelectInput
        model={terrascanStepConfigurationDto}
        setModel={setTerrascanStepConfigurationDataDto}
      />
      <TerrascanStepJenkinsJobSelectInput
        model={terrascanStepConfigurationDto}
        setModel={setTerrascanStepConfigurationDataDto}
      />
      <TerrascanJenkinsAccountInput dataObject={terrascanStepConfigurationDto} setDataObject={setTerrascanStepConfigurationDataDto} />
      <TerrascanBitbucketWorkspaceInput dataObject={terrascanStepConfigurationDto} setDataObject={setTerrascanStepConfigurationDataDto} />
      <TerrascanGitRepositoryInput dataObject={terrascanStepConfigurationDto} setDataObject={setTerrascanStepConfigurationDataDto} />
      <TerrascanGitBranchInput  dataObject={terrascanStepConfigurationDto} setDataObject={setTerrascanStepConfigurationDataDto} />
      <TerrascanDependencyTypeInput dataObject={terrascanStepConfigurationDto} setDataObject={setTerrascanStepConfigurationDataDto} />
      <WorkspaceDeleteToggleInput dataObject={terrascanStepConfigurationDto} setDataObject={setTerrascanStepConfigurationDataDto} fieldName={"workspaceDeleteFlag"} />
      <TextInputBase dataObject={terrascanStepConfigurationDto} fieldName={"terrascanConfigFilePath"} setDataObject={setTerrascanStepConfigurationDataDto}/>
      <TerrascanPlatformSelectInput dataObject={terrascanStepConfigurationDto} setDataObject={setTerrascanStepConfigurationDataDto} />
      <TerrascanRulesInput dataObject={terrascanStepConfigurationDto} setDataObject={setTerrascanStepConfigurationDataDto} platform={terrascanStepConfigurationDto.getData("platform")} />
      <TextInputBase setDataObject={setTerrascanStepConfigurationDataDto} dataObject={terrascanStepConfigurationDto} fieldName={"outputPath"} />
      <TextInputBase setDataObject={setTerrascanStepConfigurationDataDto} dataObject={terrascanStepConfigurationDto} fieldName={"outputFileName"} />
    </PipelineStepEditorPanelContainer>
  );
}

TerrascanStepConfiguration.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  createJob: PropTypes.func,
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func
};

export default TerrascanStepConfiguration;
