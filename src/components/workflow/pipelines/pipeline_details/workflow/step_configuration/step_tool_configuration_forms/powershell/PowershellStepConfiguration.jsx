import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import powershellStepFormMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/powershell/powershell-stepForm-metadata";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import PowershellJenkinsToolInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/powershell/inputs/PowershellJenkinsToolInput";
import PowershellJenkinsJobInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/powershell/inputs/PowershellJenkinsJobInput";
import modelHelpers from "components/common/model/modelHelpers";
import PowershellJenkinsAccountInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/powershell/inputs/PowershellJenkinsAccountInput";
import PowershellGitRepositoryInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/powershell/inputs/PowershellGitRepositoryInput";
import PowershellGitBranchInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/powershell/inputs/PowershellGitBranchInput";
import PowershellBitbucketWorkspaceInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/powershell/inputs/PowershellBitbucketWorkspaceInput";
import AgentLabelsMultiSelectInput
  from "../../../../../../../common/list_of_values_input/workflow/pipelines/AgentLabelsMultiSelectInput";

function PowershellStepConfiguration({ pipelineId, stepTool, stepId, createJob, closeEditorPanel }) {
  const [isLoading, setIsLoading] = useState(false);
  const [jobType, setJobType] = useState("");
  const [powershellStepConfigurationDto, setPowershellStepConfigurationDataDto] = useState(undefined);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");


  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    let { threshold, job_type } = stepTool;
    let powershellConfigurationData = modelHelpers.getPipelineStepConfigurationModel(stepTool, powershellStepFormMetadata);

    setPowershellStepConfigurationDataDto(powershellConfigurationData);
    console.log(job_type)
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
    const toolId = powershellStepConfigurationDto.getData("toolConfigId");
    console.log("saving and creating job for toolID: ", toolId);
    if (toolId) {
      // setLoading(true);

      const createJobPostBody = {
        jobId: "",
        pipelineId: pipelineId,
        stepId: stepId,
      };

      const toolConfiguration = {
        configuration: powershellStepConfigurationDto.getPersistData(),
        threshold: {
          type: thresholdType,
          value: thresholdVal,
        },
        job_type: powershellStepConfigurationDto.getData("jobType"),
      };

      await createJob(toolId, toolConfiguration, stepId, createJobPostBody);
    }
  };

  if (isLoading || powershellStepConfigurationDto == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={powershellStepConfigurationDto}
      persistRecord={handleCreateAndSave}
      isLoading={isLoading}
    >
      <PowershellJenkinsToolInput dataObject={powershellStepConfigurationDto} setDataObject={setPowershellStepConfigurationDataDto} />
      <PowershellJenkinsJobInput dataObject={powershellStepConfigurationDto} setDataObject={setPowershellStepConfigurationDataDto}/>
      <PowershellJenkinsAccountInput dataObject={powershellStepConfigurationDto} setDataObject={setPowershellStepConfigurationDataDto} />
      <PowershellBitbucketWorkspaceInput dataObject={powershellStepConfigurationDto} setDataObject={setPowershellStepConfigurationDataDto} />
      <PowershellGitRepositoryInput dataObject={powershellStepConfigurationDto} setDataObject={setPowershellStepConfigurationDataDto} />
      <PowershellGitBranchInput  dataObject={powershellStepConfigurationDto} setDataObject={setPowershellStepConfigurationDataDto} />
      <AgentLabelsMultiSelectInput
        dataObject={powershellStepConfigurationDto}
        fieldName={"agentLabels"}
        setDataObject={setPowershellStepConfigurationDataDto}
      />
      <TextInputBase setDataObject={setPowershellStepConfigurationDataDto} dataObject={powershellStepConfigurationDto} fieldName={"scriptFilePath"} />
      <TextInputBase setDataObject={setPowershellStepConfigurationDataDto} dataObject={powershellStepConfigurationDto} fieldName={"scriptFileName"} />
      <TextInputBase setDataObject={setPowershellStepConfigurationDataDto} dataObject={powershellStepConfigurationDto} fieldName={"outputPath"} />
      <TextInputBase setDataObject={setPowershellStepConfigurationDataDto} dataObject={powershellStepConfigurationDto} fieldName={"outputFileName"} />
    </PipelineStepEditorPanelContainer>
  );
}

PowershellStepConfiguration.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  createJob: PropTypes.func,
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func
};

export default PowershellStepConfiguration;
