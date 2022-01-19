import React from "react";
import PropTypes from "prop-types";
import JenkinsRegistryToolJobSelectInput
  from "components/common/list_of_values_input/tools/jenkins/tool_jobs/JenkinsRegistryToolJobSelectInput";

function SonarStepJenkinsToolJobSelectInput({ fieldName, model, setModel, disabled, jenkinsToolId }) {
  const setDataFunction = (fieldName, selectedOption) => {
    const newModel = { ...model };

    if (selectedOption?.type?.includes("SFDC")) {
      newModel.setData("buildType", "ant");
    }

    newModel.setData("toolJobId", selectedOption?._id);
    newModel.setData("toolJobType", selectedOption?.type);
    newModel.setData("jobType", selectedOption?.type[0]);
    newModel.setData("agentLabels", selectedOption?.configuration?.agentLabels);
    newModel.setData("buildToolVersion", "6.3");
    newModel.setData("projectKey", "");
    newModel.setData("buildArgs", {});

    setModel({ ...newModel });
  };

  return (
    <JenkinsRegistryToolJobSelectInput
      fieldName={fieldName}
      model={model}
      setDataFunction={setDataFunction}
      setModel={setModel}
      disabled={disabled}
      jenkinsToolId={jenkinsToolId}
      typeFilter={"CODE SCAN"}
    />
  );
}

SonarStepJenkinsToolJobSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  jenkinsToolId: PropTypes.string,
};

SonarStepJenkinsToolJobSelectInput.defaultProps = {
  fieldName: "toolJobId",
};

export default SonarStepJenkinsToolJobSelectInput;
