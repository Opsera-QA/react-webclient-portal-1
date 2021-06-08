import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import pipelineActions from "components/workflow/pipeline-actions";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { DialogToastContext } from "contexts/DialogToastContext";
import { AuthContext } from "../../../../../../../../../contexts/AuthContext";

function JenkinsWorkspaceProjectSelectInput({ fieldName, dataObject, setDataObject, disabled }) {
  const toastContext = useContext(DialogToastContext);
  const [isWorkspacesSearching, setIsWorkspacesSearching] = useState(false);
  const { getAccessToken } = useContext(AuthContext);
  const [workspacesList, setWorkspacesList] = useState([]);

  const jobType = dataObject.getData("jobType");
  const excludeArr = ["SFDC VALIDATE PACKAGE XML", "SFDC UNIT TESTING", "SFDC DEPLOY"];
  const isOrgToOrg = dataObject.getData("isOrgToOrg");
  const gitToolId = dataObject.getData("gitToolId");
  const service = dataObject.getData("service");
  const gitCredential = dataObject.getData("gitCredential");

  useEffect(() => {
    async function fetchRepos(service, gitToolId) {
      setIsWorkspacesSearching(true);
      // Set results state
      let results = await pipelineActions.searchWorkSpaces(service, gitToolId, getAccessToken);

      if (typeof results != "object") {
        setWorkspacesList([{ value: "", name: "Select One", isDisabled: "yes" }]);
        let errorMessage = "Workspace information is missing or unavailable!";
        toastContext.showErrorDialog(errorMessage);
        setIsWorkspacesSearching(false);
        return;
      }
      setWorkspacesList(results);
      setIsWorkspacesSearching(false);
    }

    if (service === "bitbucket" && gitToolId && gitToolId.length > 0) {
      // Fire off our API call
      fetchRepos(service, gitToolId);
    } else {
      setIsWorkspacesSearching(true);
      setWorkspacesList([{ value: "", name: "Select One", isDisabled: "yes" }]);
    }
  }, [service, gitToolId, gitCredential]);

  const handleDTOChange = (fieldName, value) => {
    let newDataObject = { ...dataObject };
    const emptyFields = [
      "repository",
      "repoId",
      "projectId",
      "gitUrl",
      "sshUrl",
      "branch",
      "defaultBranch",
      "gitBranch",
    ];
    newDataObject.setData("workspace", value.key);
    newDataObject.setData("workspaceName", value.name);
    emptyFields.forEach((item) => newDataObject.setData(item, ""));
    setDataObject({ ...newDataObject });
  };
  const clearDataFunction = (fieldName) => {
    let newDataObject = { ...dataObject };
    const emptyFields = [
      "repository",
      "repoId",
      "projectId",
      "gitUrl",
      "sshUrl",
      "branch",
      "defaultBranch",
      "gitBranch",
    ];
    newDataObject.setData("workspace", "");
    newDataObject.setData("workspaceName", "");
    emptyFields.forEach((item) => newDataObject.setData(item, ""));
    setDataObject({ ...newDataObject });
  };

  const valid = () => {
    return service == "bitbucket" && gitToolId && jobType && excludeArr.includes(jobType) && !isOrgToOrg;
  };

  if (!valid()) {
    return null;
  }

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataFunction={handleDTOChange}
      setDataObject={setDataObject}
      placeholderText={"Select"}
      selectOptions={workspacesList}
      valueField="key"
      textField="name"
      disabled={isWorkspacesSearching || disabled}
      clearDataFunction={clearDataFunction}
      busy={isWorkspacesSearching}
    />
  );
}

JenkinsWorkspaceProjectSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

JenkinsWorkspaceProjectSelectInput.defaultProps = {
  fieldName: "workspace",
  disabled: false,
};

export default JenkinsWorkspaceProjectSelectInput;
