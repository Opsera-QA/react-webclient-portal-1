import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import GitActionsHelper
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/helpers/git-actions-helper";

function GitRepositoryInput({ service, gitToolId, workspace, visible, fieldName, dataObject, setDataObject, setDataFunction, clearDataFunction, disabled}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [repositories, setRepositories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setRepositories([]);
    if (service && service !== "" && gitToolId && gitToolId !== "") {
      if(service === "bitbucket" && (!workspace || workspace === "")) {
        setRepositories([]);
        return;
      }
      loadData();
    }
  }, [service, gitToolId, workspace]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getRepositories();
    }
    catch (error) {
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    }
    finally {
      setIsLoading(false);
    }
    return;
  };

  const getRepositories = async () => {
    const response  = await GitActionsHelper.searchRepositories(service, gitToolId, workspace, getAccessToken);
    let repositoriesResponse = response?.data?.data;

    if (Array.isArray(repositoriesResponse)) {
      setRepositories(repositoriesResponse);
    }
  };

  if (!visible) {
    return <></>;
  }

  const getNoRepositoriesMessage = () => {
    if (!isLoading && (repositories == null || repositories.length === 0) && service !== "" && gitToolId !== "") {
      return ("No Repositories Found!");
    }
  };

  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        setDataFunction={setDataFunction}
        selectOptions={repositories}
        busy={isLoading}
        placeholderText={getNoRepositoriesMessage()}
        clearDataFunction={clearDataFunction}
        valueField="name"
        textField="name"
        disabled={disabled || isLoading || repositories.length === 0}
      />
    </div>
  );
}

GitRepositoryInput.propTypes = {
  service: PropTypes.string,
  gitToolId: PropTypes.string,
  workspace: PropTypes.string,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  clearDataFunction: PropTypes.func
};

GitRepositoryInput.defaultProps = {
  visible: true,
  placeholderText: "Select Repository"
};

export default GitRepositoryInput;