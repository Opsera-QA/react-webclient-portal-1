import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import pipelineActions from "components/workflow/pipeline-actions";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { DialogToastContext } from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";

// TODO: Rework
const disallowedJobTypes = [
  "SFDC VALIDATE PACKAGE XML",
  "SFDC UNIT TESTING",
  "SFDC DEPLOY",
];

function JenkinsWorkspaceProjectSelectInput({ fieldName, dataObject, setDataObject, disabled, service, gitToolId, jobType}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [workspacesList, setWorkspacesList] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);


  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    setWorkspacesList([]);
    if (service === "bitbucket" && gitToolId != null && gitToolId !== "") {
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [service, gitToolId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      const response = await pipelineActions.searchWorkspacesV2(getAccessToken, cancelSource, service, gitToolId);
      const workspaces = response?.data?.data;

      if (isMounted.current === true) {

        if (!Array.isArray(workspaces) || workspaces.length === 0) {
          let errorMessage = "Workspace information is missing or unavailable!";
          toastContext.showErrorDialog(errorMessage);
          return;
        }

        setWorkspacesList(workspaces);
      }
    }
    catch (error) {
      console.error(error);
      toastContext.showErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

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
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataFunction={setDataFunction}
      setDataObject={setDataObject}
      placeholderText={"Select"}
      selectOptions={workspacesList}
      valueField="key"
      textField="name"
      disabled={disabled}
      clearDataFunction={clearDataFunction}
      busy={isLoading}
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
