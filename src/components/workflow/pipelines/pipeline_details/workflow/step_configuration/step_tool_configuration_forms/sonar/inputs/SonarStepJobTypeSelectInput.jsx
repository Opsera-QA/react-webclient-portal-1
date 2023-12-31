import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

// TODO: Should we move these to a sonarJob.types.js helper file?
export const SONAR_JOB_TYPES = {
  OPSERA_MANAGED_JOB: "opsera-job",
  CUSTOM_JOB: "job",
};

export const SONAR_JOB_TYPE_SELECT_OPTIONS = [
  { value: SONAR_JOB_TYPES.CUSTOM_JOB, label: "Custom Job" },
  { value: SONAR_JOB_TYPES.OPSERA_MANAGED_JOB, label: "Opsera Managed Job" },
];

function SonarStepJobTypeSelectInput({ model, setModel }) {
  const setDataFunction = (fieldName, selectedOption) => {
    const newModel = {...model};
    newModel.setData(fieldName, selectedOption?.value);
    newModel.setDefaultValue("sonarToolConfigId");
    newModel.setDefaultValue("jobName");
    newModel.setDefaultValue("buildType");
    newModel.setDefaultValue("jobDescription");
    newModel.setDefaultValue("toolJobId");
    newModel.setDefaultValue("toolJobType");
    newModel.setDefaultValue("gitToolId");
    newModel.setDefaultValue("repoId");
    newModel.setDefaultValue("gitUrl");
    newModel.setDefaultValue("sshUrl");
    newModel.setDefaultValue("service");
    newModel.setDefaultValue("gitCredential");
    newModel.setDefaultValue("gitUserName");
    newModel.setDefaultValue("repository");
    newModel.setDefaultValue("workspace");
    newModel.setDefaultValue("workspaceName");
    newModel.setDefaultValue("branch");
    newModel.setDefaultValue("accountUsername");
    newModel.setDefaultValue("projectId");
    newModel.setDefaultValue("defaultBranch");

    const jobType = selectedOption?.value === SONAR_JOB_TYPES.CUSTOM_JOB ? "CODE SCAN" : "job";

    newModel.setData("jobType", jobType);

    setModel({...newModel});
  };
  
  return (
    <SelectInputBase
      fieldName={"job_type"}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      placeholderText={"Select Job Type"}
      selectOptions={SONAR_JOB_TYPE_SELECT_OPTIONS}
      valueField={"value"}
      textField={"label"}
    />
  );
}

SonarStepJobTypeSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
};

export default SonarStepJobTypeSelectInput;
