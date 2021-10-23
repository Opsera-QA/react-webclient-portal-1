import React from "react";
import PropTypes from "prop-types";
import JenkinsJobSelectInput
  from "components/common/list_of_values_input/tools/jenkins/tool_jobs/JenkinsJobSelectInput";
import {CYPRESS_JOB_TYPES} from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/cypress/inputs/CypressStepJobTypeSelectInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";

function CypressStepJenkinsJobSelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("toolJobId", selectedOption?._id);
    newModel.setData("toolJobType", selectedOption?.type);
    newModel.setData("jobType", selectedOption?.jobType[0]);
    newModel.setData("buildToolVersion", "6.3");
    newModel.setData("projectKey", "");
    newModel.setData("buildArgs", {});

    // TODO: Will this ever be the case?
    if (selectedOption?.type.includes("SFDC")) {
      newModel.setData("buildType", "ant");
    }

    const configuration = selectedOption?.configuration;
    const gradleTask = configuration?.gradleTask || "";
    const mavenTask = configuration?.mavenTask || "";
    const buildTool = configuration?.buildTool || "";
    const agentLabels = configuration?.agentLabels || "";
    const buildType = configuration?.buildType || "";

    newModel.setData("gradleTask", gradleTask);
    newModel.setData("mavenTask", mavenTask);
    newModel.setData("agentLabels", agentLabels);
    newModel.setData("buildType", buildType);
    newModel.setData("buildTool", buildTool);

    setModel({...newModel});
  };

  if (model?.getData("opsera_job_type") === CYPRESS_JOB_TYPES.CUSTOM_JOB) {
    return (
      <TextInputBase
        fieldName={"jobName"}
        dataObject={model}
        setDataObject={setModel}
      />
    );
  }

  return (
     <JenkinsJobSelectInput
       fieldName={"toolJobId"}
       typeFilter={"CYPRESS UNIT TESTING"}
       dataObject={model}
       setDataObject={setModel}
       setDataFunction={setDataFunction}
       jenkinsId={model?.getData("toolConfigId")}
       disabled={disabled}
     />
  );
}

CypressStepJenkinsJobSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default CypressStepJenkinsJobSelectInput;