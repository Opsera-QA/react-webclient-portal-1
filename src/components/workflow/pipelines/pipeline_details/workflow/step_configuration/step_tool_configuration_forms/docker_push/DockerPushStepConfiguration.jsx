import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import dockerPushStepFormMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/docker_push/dockerpush-stepForm-metadata";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import DockerPushStepJenkinsToolSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/docker_push/inputs/DockerPushStepJenkinsToolSelectInput";
import DockerPushStepJenkinsJobSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/docker_push/inputs/DockerPushStepJenkinsJobSelectInput";
import modelHelpers from "components/common/model/modelHelpers";
import DockerPushNewRepoToggleInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/docker_push/inputs/DockerPushNewRepoToggleInput";
import _ from "lodash";
import DockerPushAwsRepoInput from "./inputs/DockerPushAwsRepoInput";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import AWSToolSelectInput
  from "components/inventory/tools/tool_details/tool_jobs/octopus/applications/details/input/AWSToolSelectInput";

function DockerPushStepConfiguration({ pipelineId, plan, stepTool, stepId, createJob, closeEditorPanel }) {
  const [isLoading, setIsLoading] = useState(false);
  const [listOfSteps, setListOfSteps] = useState([]);
  const [jobType, setJobType] = useState("");
  const [dockerPushStepConfigurationDto, setDockerPushStepConfigurationDataDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    let { job_type } = stepTool;
    
    if (plan && stepId) {
      let pipelineSteps = formatStepOptions(plan, stepId);
      let groupedSteps = _.groupBy(pipelineSteps, "tool.tool_identifier");
      let jenkinsSteps =
        Object.keys(groupedSteps).length > 0
          ? (groupedSteps.jenkins  || groupedSteps["command-line"])
            ? ( (groupedSteps.jenkins  && groupedSteps["command-line"]) ?  [...groupedSteps.jenkins, ...groupedSteps["command-line"]] : groupedSteps.jenkins ? groupedSteps.jenkins : groupedSteps["command-line"] ? groupedSteps["command-line"] 
            : [{ _id: "", name: "Please configure a jenkins build step", isDisabled: "yes" }]
             )
            : [{ _id: "", name: "Please configure a jenkins build step", isDisabled: "yes" }]
          : [{ _id: "", name: "Please configure a jenkins build step", isDisabled: "yes" }];
      
      setListOfSteps(jenkinsSteps);
    }

    let dockerPushConfigurationData = modelHelpers.getPipelineStepConfigurationModel(stepTool, dockerPushStepFormMetadata);

    setDockerPushStepConfigurationDataDto(dockerPushConfigurationData);

    if (job_type) {
      setJobType(job_type);
    }
    setIsLoading(false);
  };

  const formatStepOptions = (plan, stepId) => {
    let STEP_OPTIONS = plan.slice(
      0,
      plan.findIndex((element) => element._id === stepId)
    );
    STEP_OPTIONS.unshift({ _id: "", name: "Select One", isDisabled: "yes" });
    return STEP_OPTIONS;
  };

  const getDynamicFields = () => {
    if (dockerPushStepConfigurationDto.getData("newRepo") === true) {
      return (
        <div>
          <DockerPushAwsRepoInput dataObject={dockerPushStepConfigurationDto} fieldName={"ecrRepoName"} setDataObject={setDockerPushStepConfigurationDataDto}/>
        </div>
      );
    }
    return (<TextInputBase dataObject={dockerPushStepConfigurationDto} fieldName={"ecrRepoName"} setDataObject={setDockerPushStepConfigurationDataDto}/>);
  };

  const handleCreateAndSave = async () => {
    const toolId = dockerPushStepConfigurationDto.getData("toolConfigId");
    console.log("saving and creating job for toolID: ", toolId);
    if (toolId) {
      const createJobPostBody = {
        jobId: "",
        pipelineId: pipelineId,
        stepId: stepId,
      };
      console.log("createJobPostBody: ", createJobPostBody);

      const toolConfiguration = {
        configuration: dockerPushStepConfigurationDto.getPersistData(),
        job_type: dockerPushStepConfigurationDto.getData("jobType"),
      };
      console.log("item: ", toolConfiguration);

      await createJob(toolId, toolConfiguration, stepId, createJobPostBody);
    }
  };

  if (isLoading || dockerPushStepConfigurationDto == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={dockerPushStepConfigurationDto}
      persistRecord={handleCreateAndSave}
      isLoading={isLoading}
    >
      <DockerPushStepJenkinsToolSelectInput
        model={dockerPushStepConfigurationDto}
        setModel={setDockerPushStepConfigurationDataDto}
      />
      <DockerPushStepJenkinsJobSelectInput
        model={dockerPushStepConfigurationDto}
        setModel={setDockerPushStepConfigurationDataDto}
      />
      <AWSToolSelectInput
        fieldName={"awsToolConfigId"}
        dataObject={dockerPushStepConfigurationDto}
        setDataObject={setDockerPushStepConfigurationDataDto}
        disabled={
          (dockerPushStepConfigurationDto && dockerPushStepConfigurationDto.getData("toolConfigId") && dockerPushStepConfigurationDto.getData("toolConfigId").length === 0) 
            ? true
            : false
        }
      />
      <SelectInputBase
        setDataObject={setDockerPushStepConfigurationDataDto}
        textField={"name"}
        valueField={"_id"}
        dataObject={dockerPushStepConfigurationDto}
        filter={"contains"}
        selectOptions={listOfSteps ? listOfSteps : []}
        fieldName={"buildStepId"}
      />
      {/* <AgentLabelsMultiSelectInput
        dataObject={dockerPushStepConfigurationDto}
        fieldName={"agentLabels"}
        setDataObject={setDockerPushStepConfigurationDataDto}
      /> */}
      <DockerPushNewRepoToggleInput dataObject={dockerPushStepConfigurationDto} setDataObject={setDockerPushStepConfigurationDataDto} fieldName={"newRepo"}/>
      {getDynamicFields()}
    </PipelineStepEditorPanelContainer>
  );
}

DockerPushStepConfiguration.propTypes = {
  pipelineId: PropTypes.string,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  createJob: PropTypes.func,
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func
};

export default DockerPushStepConfiguration;
