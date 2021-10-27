import React, { useEffect } from "react";
import PropTypes from "prop-types";
import JenkinsRegistryToolJobSelectInput
  from "components/common/list_of_values_input/tools/jenkins/tool_jobs/JenkinsRegistryToolJobSelectInput";

function JenkinsStepToolJobSelectInput({ fieldName, model, setModel, disabled, jenkinsToolId, toolJobType, jobType }) {
  // TODO: We need to rework this
  useEffect(() => {
    if (Array.isArray(toolJobType) && toolJobType.includes("SFDC")) {
      let newDataObject = { ...model };
      newDataObject.setData("buildType", "ant");
      setModel({ ...newDataObject });
    }
  }, [toolJobType]);

  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = { ...model };
    newDataObject.setData("toolJobId", selectedOption._id);
    newDataObject.setData("toolJobType", selectedOption?.type);

    if(selectedOption.type[0]==='SFDC'){
      newDataObject.setData("jobType", selectedOption?.configuration?.jobType);
    } else {
      newDataObject.setData("jobType", selectedOption?.type[0]);
    }

    newDataObject.setData("rollbackBranchName", "");
    newDataObject.setData("stepIdXML", "");
    newDataObject.setData("sfdcDestToolId", "");
    newDataObject.setData("destAccountUsername", "");
    newDataObject.setData("buildToolVersion", "6.3");
    newDataObject.setData("buildArgs", {});

    const configuration = selectedOption?.configuration;
    const gradleTask = configuration?.gradleTask || "";
    const mavenTask = configuration?.mavenTask || "";
    const buildTool = configuration?.buildTool || "";
    const agentLabels = configuration?.agentLabels || "";
    const buildType = configuration?.buildType || "";

    newDataObject.setData("gradleTask", gradleTask);
    newDataObject.setData("mavenTask", mavenTask);
    newDataObject.setData("agentLabels", agentLabels);
    newDataObject.setData("buildType", buildType);
    newDataObject.setData("buildTool", buildTool);

    // TODO: We need to re-evaluate and rework this:
    if ("configuration" in selectedOption) {
      const keys = Object.keys(selectedOption?.configuration);
      keys.forEach((item) => {       
        if (!["toolJobId", "toolJobType", "jobType"].includes(item)) {
          newDataObject.setData(item, selectedOption?.configuration[item]);
        }
      });
    }
    
    setModel({ ...newDataObject });
  };


  if (jobType !== "opsera-job") {
    return <></>;
  }

  return (
    <JenkinsRegistryToolJobSelectInput
      fieldName={fieldName}
      model={model}
      setDataFunction={setDataFunction}
      setModel={setModel}
      disabled={disabled}
      jenkinsToolId={jenkinsToolId}
    />
  );
}

JenkinsStepToolJobSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  jenkinsToolId: PropTypes.string,
  jobType: PropTypes.string,
  toolJobType: PropTypes.any,
};

JenkinsStepToolJobSelectInput.defaultProps = {
  fieldName: "toolJobId",
};

export default JenkinsStepToolJobSelectInput;
