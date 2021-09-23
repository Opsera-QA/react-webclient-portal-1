import React from "react";
import PropTypes from "prop-types";
import RepositorySelectInput from "components/common/list_of_values_input/tools/git/RepositorySelectInput";

function JenkinsRepositorySelectInput({dataObject, setDataObject, disabled}) {

  //const sfdcJobType =  dataObject.getData("sfdcJobType");
  const jobType =  dataObject.getData("jobType");

  const setRepository = (fieldName, selectedOption) => {
    let newDataObject = { ...dataObject };

    newDataObject.setData("repository", selectedOption.name);
    newDataObject.setData("repoId", selectedOption.id);
    newDataObject.setData("projectId", selectedOption.id);
    newDataObject.setData("gitUrl", selectedOption.httpUrl || "");
    newDataObject.setData("sshUrl", selectedOption.sshUrl || "");
    newDataObject.setData("branch", "");
    newDataObject.setData("defaultBranch", "");
    newDataObject.setData("gitBranch", "");

    setDataObject({ ...newDataObject });
  };
  const clearDataFunction = () => {
    let newDataObject = { ...dataObject };

    newDataObject.setData("repository", "");
    newDataObject.setData("repoId", "");
    newDataObject.setData("projectId", "");
    newDataObject.setData("gitUrl", "");
    newDataObject.setData("sshUrl", "");
    newDataObject.setData("branch", "");
    newDataObject.setData("defaultBranch", "");
    newDataObject.setData("gitBranch", "");

    setDataObject({ ...newDataObject });
  };
  const valid =()=>{
    return dataObject.data.service && dataObject.data.gitToolId &&
      jobType != "SFDC VALIDATE PACKAGE XML" && 
      jobType != "SFDC UNIT TESTING" && 
      jobType != "SFDC DEPLOY" && 
      (dataObject.data.service === "bitbucket" ? dataObject.data.workspace && dataObject.data.workspace.length > 0 : true ) && 
      !dataObject.data.isOrgToOrg;
  };
  if(!valid()) return null;

  return (
     <RepositorySelectInput
       fieldName={"repository"}
       service={dataObject.getData("service")}
       gitToolId={dataObject.getData("gitToolId")}
       workspace={dataObject.getData("workspace")}
       dataObject={dataObject}
       setDataObject={setDataObject}
       setDataFunction={setRepository}
       disabled={disabled}
       clearDataFunction={clearDataFunction}
     />
  );
}

JenkinsRepositorySelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool
};
JenkinsRepositorySelectInput.defaultProps = {
  disabled: false,
};

export default JenkinsRepositorySelectInput;