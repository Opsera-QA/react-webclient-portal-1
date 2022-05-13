import React from "react";
import PropTypes from "prop-types";
import RepositorySelectInput from "components/common/list_of_values_input/tools/repositories/RepositorySelectInput";

// TODO: Rework
const disallowedJobTypes = [
  "SFDC VALIDATE PACKAGE XML",
  "SFDC UNIT TESTING",
  "SFDC DEPLOY",
];

function JenkinsRepositorySelectInput({dataObject, setDataObject, disabled, gitToolId, jobType, service, workspace}) {

  const setDataFunction = (fieldName, selectedOption) => {
    const newDataObject = { ...dataObject };
    const repoId = selectedOption?._id || selectedOption?.id || selectedOption?.repositoryId || "";
    const gitUrl = selectedOption?.httpUrl || selectedOption?.remoteUrl || "";
    const sshUrl = selectedOption?.sshUrl || selectedOption?.configuration?.sshUrl || "";
    newDataObject.setData("repository", selectedOption?.name);
    newDataObject.setData("repoId", repoId);
    newDataObject.setData("projectId", repoId);
    newDataObject.setData("gitUrl", gitUrl);
    newDataObject.setData("sshUrl", sshUrl);
    newDataObject.setData("branch", "");
    newDataObject.setData("defaultBranch", "");
    newDataObject.setData("gitBranch", "");
    setDataObject({ ...newDataObject });
  };

  const clearDataFunction = () => {
    const newDataObject = { ...dataObject };
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

  // TODO: Rework
  const valid = () => {
    return (
      service != null
      && service !== ""
      && gitToolId
      && !disallowedJobTypes.includes(jobType)
      && (service === "bitbucket" ? workspace && workspace.length > 0 : true)
      && !dataObject.getData("isOrgToOrg")
    );
  };

  if(valid() !== true) {
    return null;
  }

  return (
     <RepositorySelectInput
       fieldName={"repository"}
       service={dataObject.getData("service")}
       gitToolId={dataObject.getData("gitToolId")}
       workspace={dataObject.getData("workspace")}
       validateSavedData={true}
       dataObject={dataObject}
       setDataObject={setDataObject}
       setDataFunction={setDataFunction}
       disabled={disabled}
       clearDataFunction={clearDataFunction}
     />
  );
}

JenkinsRepositorySelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  service: PropTypes.string,
  gitToolId: PropTypes.string,
  jobType: PropTypes.string,
  workspace: PropTypes.string,
};

export default JenkinsRepositorySelectInput;