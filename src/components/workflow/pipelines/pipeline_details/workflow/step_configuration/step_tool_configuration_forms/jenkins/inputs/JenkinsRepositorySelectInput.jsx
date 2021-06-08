import React, {useEffect, useState, useContext, useRef} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import pipelineActions from "components/workflow/pipeline-actions";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";

const excludeArr = ["SFDC VALIDATE PACKAGE XML", "SFDC UNIT TESTING", "SFDC DEPLOY"];

function JenkinsRepositorySelectInput({ fieldName, dataObject, setDataObject, disabled, service, gitToolId }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [repoList, setRepoList] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    setRepoList([]);
    if (service?.length > 0 && gitToolId?.length > 0) {
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

  const loadData = async () => {
    try {
      setIsLoading(true);
      const response = await pipelineActions.searchRepositoriesV2(getAccessToken, cancelTokenSource, service, gitToolId, getAccessToken);
      const repositoryList = response?.data?.data;

      if (isMounted?.current === true) {
        if (!Array.isArray(repositoryList) || repositoryList.length === 0) {
          let errorMessage = "Repository information is missing or unavailable!";
          toastContext.showErrorDialog(errorMessage);
        }
        else {
          setRepoList(repositoryList);
        }
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

  const setDataFunction = (fieldName, selectedOption) => {
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

  const valid = () => {
    return (
      service
      && gitToolId
      && !excludeArr.includes(dataObject.getData("jobType"))
      && (service === "bitbucket" ? dataObject.getData("workspace") && dataObject.getData("workspace").length > 0 : true)
      && !dataObject.getData("isOrgToOrg")
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
      placeholderText={"Select Jenkins Repository"}
      selectOptions={repoList}
      valueField="value"
      textField="name"
      disabled={isLoading || disabled}
      clearDataFunction={clearDataFunction}
      busy={isLoading}
    />
  );
}

JenkinsRepositorySelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

JenkinsRepositorySelectInput.defaultProps = {
  fieldName: "repository",
};

export default JenkinsRepositorySelectInput;
