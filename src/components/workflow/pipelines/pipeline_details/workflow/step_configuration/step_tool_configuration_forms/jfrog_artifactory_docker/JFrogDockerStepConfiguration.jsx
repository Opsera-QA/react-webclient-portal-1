import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import JfrogStepJfrogToolSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/jfrog_artifactory_docker/inputs/JfrogStepJfrogToolSelectInput";
import JfrogStepJenkinsToolSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/jfrog_artifactory_docker/inputs/JfrogStepJenkinsToolSelectInput";
import JfrogDockerStepJenkinsJobSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/jfrog_artifactory_docker/inputs/JfrogDockerStepJenkinsJobSelectInput";
import JFrogBuildStepSelectInput from "./inputs/JFrogBuildStepSelectInput";
import JfrogRepoSelectInput from "./inputs/JfrogRepoSelectInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import jfrogStepFormMetadata from "./jfrog-stepForm-metadata";
import JFrogRepositoryTypeSelectInput from "./inputs/JFrogRepositoryTypeSelectInput";

function JFrogDockerStepConfiguration({ pipelineId, stepTool, stepId, createJob, closeEditorPanel, plan }) {
  const [isLoading, setIsLoading] = useState(false);
  const [jobType, setJobType] = useState("");
  const [jfrogStepConfigurationDto, setJFrogStepConfigurationDataDto] = useState(undefined);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");
  const [listOfSteps, setListOfSteps] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (plan && stepId) {
      setListOfSteps(formatStepOptions(plan, stepId));
    }
  }, [plan, stepId]);

  const formatStepOptions = (plan, stepId) => {
    let STEP_OPTIONS = plan.slice(
      0,
      plan.findIndex((element) => element._id === stepId)
    );
    return STEP_OPTIONS;
  };

  const loadData = async () => {
    setIsLoading(true);
    let { threshold, job_type } = stepTool;
    let jfrogConfigurationData = modelHelpers.getPipelineStepConfigurationModel(stepTool, jfrogStepFormMetadata);

    if (jfrogConfigurationData.getData("type") === "PORTPERREPO") {
      jfrogConfigurationData.setMetaDataFields(jfrogStepFormMetadata.fieldsAlt);
    }
    setJFrogStepConfigurationDataDto(jfrogConfigurationData);

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
    const toolId = jfrogStepConfigurationDto.getData("toolConfigId");
    console.log("saving and creating job for toolID: ", toolId);
    if (toolId) {
      const createJobPostBody = {
        jobId: "",
        pipelineId: pipelineId,
        stepId: stepId,
      };
      console.log("createJobPostBody: ", createJobPostBody);

      const toolConfiguration = {
        configuration: jfrogStepConfigurationDto.getPersistData(),
        threshold: {
          type: thresholdType,
          value: thresholdVal,
        },
        job_type: jfrogStepConfigurationDto.getData("jobType"),
      };
      console.log("item: ", toolConfiguration);

      await createJob(toolId, toolConfiguration, stepId, createJobPostBody);
    }
  };

  if (isLoading || jfrogStepConfigurationDto == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={jfrogStepConfigurationDto}
      persistRecord={handleCreateAndSave}
      isLoading={isLoading}
    >
      <JfrogStepJfrogToolSelectInput
        model={jfrogStepConfigurationDto}
        setModel={setJFrogStepConfigurationDataDto}
      />
      <JfrogStepJenkinsToolSelectInput
        model={jfrogStepConfigurationDto}
        setModel={setJFrogStepConfigurationDataDto}
      />
      <JfrogDockerStepJenkinsJobSelectInput
        model={jfrogStepConfigurationDto}
        setModel={setJFrogStepConfigurationDataDto}
        disabled={jfrogStepConfigurationDto && jfrogStepConfigurationDto.getData("toolConfigId")?.length === 0}
      />
      <JFrogBuildStepSelectInput
        dataObject={jfrogStepConfigurationDto}
        setDataObject={setJFrogStepConfigurationDataDto}
        options={listOfSteps}
        disabled={
          (jfrogStepConfigurationDto && jfrogStepConfigurationDto.getData("toolJobName")?.length === 0) ||
          (listOfSteps && listOfSteps.length === 0)
        }
      />
      <JFrogRepositoryTypeSelectInput
        dataObject={jfrogStepConfigurationDto}
        setDataObject={setJFrogStepConfigurationDataDto}
      />
      {jfrogStepConfigurationDto && jfrogStepConfigurationDto.getData("type") === "PORTPERREPO" ?
        <TextInputBase fieldName="port" setDataObject={setJFrogStepConfigurationDataDto} dataObject={jfrogStepConfigurationDto}/> :
        <JfrogRepoSelectInput
          fieldName={"repositoryName"}
          dataObject={jfrogStepConfigurationDto}
          setDataObject={setJFrogStepConfigurationDataDto}
          options={listOfSteps}
          disabled={jfrogStepConfigurationDto && jfrogStepConfigurationDto.getData("jfrogToolConfigId")?.length === 0}
          tool_prop={
            jfrogStepConfigurationDto && jfrogStepConfigurationDto.getData("jfrogToolConfigId")
              ? jfrogStepConfigurationDto.getData("jfrogToolConfigId")
              : ""
          }
        />
      }
    </PipelineStepEditorPanelContainer>
  );
}

JFrogDockerStepConfiguration.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  createJob: PropTypes.func,
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func,
  plan: PropTypes.array,
};

export default JFrogDockerStepConfiguration;
