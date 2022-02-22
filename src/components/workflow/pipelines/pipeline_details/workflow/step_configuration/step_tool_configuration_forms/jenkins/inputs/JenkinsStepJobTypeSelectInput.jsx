import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

// TODO: Should we move these to a jenkins.job.types.js helper file?
export const JENKINS_JOB_TYPES = {
  OPSERA_MANAGED_JOB: "opsera-job",
  CUSTOM_JOB: "job",
  SALESFORCE_PACKAGE_GENERATION_JOB: "sfdc-ant",
  SALESFORCE_PROFILE_MIGRATION_JOB: "sfdc-ant-profile",
};

export const JENKINS_JOB_OPTIONS = [
  { value: JENKINS_JOB_TYPES.CUSTOM_JOB, label: "Custom Job" },
  { value: JENKINS_JOB_TYPES.OPSERA_MANAGED_JOB, label: "Opsera Managed Job" },
  { value: JENKINS_JOB_TYPES.SALESFORCE_PACKAGE_GENERATION_JOB, label: "Salesforce Package Generation Job" },
  { value: JENKINS_JOB_TYPES.SALESFORCE_PROFILE_MIGRATION_JOB, label: "Salesforce Migration Job" },
];

function JenkinsStepJobTypeSelectInput({ model, setModel }) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...model};
    newDataObject.setData("job_type", selectedOption?.value);

    switch (selectedOption.value) {
      case JENKINS_JOB_TYPES.SALESFORCE_PACKAGE_GENERATION_JOB:
        newDataObject.setData("buildType", "ant");
        newDataObject.setData("jobDescription", "PACKAGEXML_CREATION");
        newDataObject.setData("jobType", "SFDC CREATE PACKAGE XML");
        newDataObject.setData("isOrgToOrg", false);
        break;
      case JENKINS_JOB_TYPES.SALESFORCE_PROFILE_MIGRATION_JOB:
        newDataObject.setData("buildType", "ant");
        newDataObject.setData("jobDescription", "Profile-migration");
        newDataObject.setData("jobType", "SFDC PROFILE DEPLOY");
        newDataObject.setData("isOrgToOrg", true);
        break;
      default:
        newDataObject.setData("sfdcToolId", "");
        newDataObject.setData("accountUsername", "");
        newDataObject.setData("buildType", "gradle");
        newDataObject.setData("jobDescription", "");
        newDataObject.setData("jobType", "BUILD");
        newDataObject.setData("isOrgToOrg", false);
        newDataObject.setData("buildArgs", {});
        break;
    }

    newDataObject.setData("toolJobId", "");
    newDataObject.setData("toolJobType", "");
    newDataObject.setData("rollbackBranchName", "");
    newDataObject.setData("stepIdXML", "");
    newDataObject.setData("sfdcDestToolId", "");
    setModel({...newDataObject});
  };
  
  return (
    <SelectInputBase
      fieldName={"job_type"}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      placeholderText={"Select Job Type"}
      selectOptions={JENKINS_JOB_OPTIONS}
      valueField={"value"}
      textField={"label"}
    />
  );
}

JenkinsStepJobTypeSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
};

export default JenkinsStepJobTypeSelectInput;
