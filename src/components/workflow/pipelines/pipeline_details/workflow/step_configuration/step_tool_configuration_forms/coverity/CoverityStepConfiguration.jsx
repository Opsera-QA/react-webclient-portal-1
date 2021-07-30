import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import coverityStepFormMetadata from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/coverity/coverity-stepForm-metadata";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import modelHelpers from "components/common/model/modelHelpers";
import CoverityBitbucketWorkspaceInput from "./inputs/CoverityBitbucketWorkspaceInput";
import CoverityGitRepositoryInput from "./inputs/CoverityGitRepositoryInput";
import CoverityGitBranchInput from "./inputs/CoverityGitBranchInput";
import CoverityAccountInput from "./inputs/CoverityAccountInput";
import CoverityJenkinsAccountInput from "./inputs/CoverityJenkinsAccountInput";
import JenkinsToolConfigIdSelectInput from "../coverity/inputs/JenkinsToolConfigIdSelectInput";
import CoverityToolSelectInput from "./inputs/CoverityToolSelectInput";
import WorkspaceDeleteToggleInput from "./inputs/WorkspaceDeleteToggleInput";

function CoverityStepConfiguration({ pipelineId, stepTool, stepId,createJob, closeEditorPanel, parentCallback }) {
  const [isLoading, setIsLoading] = useState(false);
  const [coverityStepConfigurationDto, setCoverityStepConfigurationDataDto] = useState(undefined);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    let { threshold } = stepTool;
    let coverityConfigurationData = modelHelpers.getPipelineStepConfigurationModel(
      stepTool,
      coverityStepFormMetadata
    );

    setCoverityStepConfigurationDataDto(coverityConfigurationData);

    if (threshold) {
      setThresholdType(threshold?.type);
      setThresholdValue(threshold?.value);
    }

    setIsLoading(false);
  };

  const handleCreateJobAndSave = async () => {
    const toolId = coverityStepConfigurationDto.getData("toolConfigId");

    if (toolId) {
      const createJobPostBody = {
        jobId: "",
        pipelineId: pipelineId,
        stepId: stepId,
      };

      const toolConfiguration = {
        configuration: coverityStepConfigurationDto.getPersistData(),
        threshold: {
          type: thresholdType,
          value: thresholdVal,
        },
        job_type: coverityStepConfigurationDto.getData("jobType"),
      };

      await createJob(toolId, toolConfiguration, stepId, createJobPostBody);
    }
  };


  if (isLoading || coverityStepConfigurationDto == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={coverityStepConfigurationDto}
      persistRecord={handleCreateJobAndSave}
      isLoading={isLoading}
    >
     <JenkinsToolConfigIdSelectInput
        dataObject={coverityStepConfigurationDto}
        setDataObject={setCoverityStepConfigurationDataDto}
      />
      <CoverityToolSelectInput
        dataObject={coverityStepConfigurationDto}
        setDataObject={setCoverityStepConfigurationDataDto}
      />
      <CoverityAccountInput dataObject={coverityStepConfigurationDto} setDataObject={setCoverityStepConfigurationDataDto} />
      <TextInputBase
              setDataObject={setCoverityStepConfigurationDataDto}
              dataObject={coverityStepConfigurationDto}
              fieldName={"projectName"}
      />
      <TextInputBase
              setDataObject={setCoverityStepConfigurationDataDto}
              dataObject={coverityStepConfigurationDto}
              fieldName={"streamName"}
      />
      <CoverityJenkinsAccountInput dataObject={coverityStepConfigurationDto} setDataObject={setCoverityStepConfigurationDataDto} />
      <CoverityBitbucketWorkspaceInput dataObject={coverityStepConfigurationDto} setDataObject={setCoverityStepConfigurationDataDto} />
      <CoverityGitRepositoryInput dataObject={coverityStepConfigurationDto} setDataObject={setCoverityStepConfigurationDataDto} />
      <CoverityGitBranchInput  dataObject={coverityStepConfigurationDto} setDataObject={setCoverityStepConfigurationDataDto} />
      <WorkspaceDeleteToggleInput dataObject={coverityStepConfigurationDto} setDataObject={setCoverityStepConfigurationDataDto} fieldName={"workspaceDeleteFlag"} />
    </PipelineStepEditorPanelContainer>
  );
}

CoverityStepConfiguration.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func,
  createJob: PropTypes.func
};

export default CoverityStepConfiguration;
