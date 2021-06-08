import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const JOB_OPTIONS = [
  { value: "job", label: "Custom Job" },
  { value: "opsera-job", label: "Opsera Managed Jobs" },
  { value: "sfdc-ant", label: "SFDC Package Generation Job" },
  { value: "sfdc-ant-profile", label: "SFDC Profile Migration" },
];

function JenkinsJobTypeSelectInput({ dataObject, setDataObject, jobTypeObject, setJobTypeObject }) {
 
  const handleJobTypeChange = (fieldName, selectedOption) => {
    let newJobObject = { ...jobTypeObject };
    newJobObject.setData("job_type", selectedOption.value);
    setJobTypeObject({ ...newJobObject });
    let newDataObject = { ...dataObject };
    switch (selectedOption.value) {
      case "sfdc-ant":
        newDataObject.setData("buildType", "ant");
        newDataObject.setData("jobDescription", "PACKAGEXML_CREATION");
        newDataObject.setData("jobType", "SFDC CREATE PACKAGE XML");
        newDataObject.setData("isOrgToOrg", false);
        break;
      case "sfdc-ant-profile":
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
    setDataObject({ ...newDataObject });
  };
  
  if (!jobTypeObject) {
    return <></>;
  }

  return (
    <div className={"mb-3"}>
      <SelectInputBase
        fieldName={"job_type"}
        dataObject={jobTypeObject}
        setDataObject={setJobTypeObject}
        setDataFunction={handleJobTypeChange}
        placeholderText={"Select Job Type"}
        selectOptions={JOB_OPTIONS}
        valueField="value"
        textField="label"
        disabled={false}
      />
    </div>
  );
}

JenkinsJobTypeSelectInput.propTypes = {
  setJobTypeObject: PropTypes.func,
  jobTypeObject: PropTypes.object,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
};

export default JenkinsJobTypeSelectInput;
