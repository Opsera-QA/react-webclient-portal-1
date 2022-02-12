import React from "react";
import PropTypes from "prop-types";
import BitbucketWorkspaceInput from "components/common/list_of_values_input/tools/bitbucket/workspaces/BitbucketWorkspaceInput";

// TODO: Rework
const disallowedJobTypes = [
  "SFDC VALIDATE PACKAGE XML",
  "SFDC UNIT TESTING",
  "SFDC DEPLOY",
];

function JenkinsWorkspaceProjectSelectInput({ fieldName, dataObject, setDataObject, disabled, service, gitToolId, jobType}) {
  const setDataFunction = (fieldName, value) => {
    let newDataObject = { ...dataObject };
    newDataObject.setData("repository", "");
    newDataObject.setData("repoId", "");
    newDataObject.setData("projectId", "");
    newDataObject.setData("gitUrl", "");
    newDataObject.setData("sshUrl", "");
    newDataObject.setData("branch", "");
    newDataObject.setData("defaultBranch", "");
    newDataObject.setData("gitBranch", "");
    newDataObject.setData("workspace", value.key);
    newDataObject.setData("workspaceName", value.name);
    setDataObject({...newDataObject});
  };

  const clearDataFunction = () => {
    let newDataObject = {...dataObject};
    newDataObject.setData("repository", "");
    newDataObject.setData("repoId", "");
    newDataObject.setData("projectId", "");
    newDataObject.setData("gitUrl", "");
    newDataObject.setData("sshUrl", "");
    newDataObject.setData("branch", "");
    newDataObject.setData("defaultBranch", "");
    newDataObject.setData("gitBranch", "");
    newDataObject.setData("workspace", "");
    newDataObject.setData("workspaceName", "");
    setDataObject({...newDataObject});
  };

  // TODO: Rework
  const valid = () => {
    return (
      service === "bitbucket"
      && gitToolId != null
      && gitToolId !== ""
      && !disallowedJobTypes.includes(jobType)
      && dataObject.getData("isOrgToOrg") === false
    );
  };

  if (dataObject == null || !valid()) {
    return null;
  }

  return (
    <BitbucketWorkspaceInput
      fieldName={fieldName}
      dataObject={dataObject}
      setDataFunction={setDataFunction}
      gitToolId={gitToolId}
      setDataObject={setDataObject}
      clearDataFunction={clearDataFunction}
      disabled={disabled}
    />
  );
}

JenkinsWorkspaceProjectSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  service: PropTypes.string,
  gitToolId: PropTypes.string,
  jobType: PropTypes.string,
};

JenkinsWorkspaceProjectSelectInput.defaultProps = {
  fieldName: "workspace",
  disabled: false,
};

export default JenkinsWorkspaceProjectSelectInput;
