import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const JENKINS_JOB_OPTIONS = [
  { value: "job", label: "Custom Job" },
  { value: "opsera-job", label: "Opsera Managed Jobs" },
  { value: "sfdc-ant", label: "SFDC Package Generation Job" },
  { value: "sfdc-ant-profile", label: "SFDC Profile Migration" },
];

function JenkinsJobTypeSelectInput({ dataObject, setDataObject }) {
 
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = { ...dataObject };
    newDataObject.setData("job_type", selectedOption.value);
    

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
  
  if (dataObject == null) {
    return <></>;
  }

  return (
    <div className={"mb-3"}>
      <SelectInputBase
        fieldName={"job_type"}
        dataObject={dataObject}
        setDataObject={setDataObject}
        setDataFunction={setDataFunction}
        placeholderText={"Select Job Type"}
        selectOptions={JENKINS_JOB_OPTIONS}
        valueField="value"
        textField="label"
      />
    </div>
  );
}

JenkinsJobTypeSelectInput.propTypes = {
  
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
};

export default JenkinsJobTypeSelectInput;
