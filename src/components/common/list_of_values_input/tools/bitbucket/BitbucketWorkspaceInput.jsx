import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import pipelineActions from "components/workflow/pipeline-actions";

// TODO: If the workspaces are used by different tools make more generic version
function BitbucketWorkspaceInput({ gitToolId, visible, fieldName, dataObject, setDataObject, setDataFunction, clearDataFunction, disabled}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [workspaces, setWorkspaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setWorkspaces([]);
    if (gitToolId !== "") {
      loadData();
    }
  }, [gitToolId]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getWorkspaces();
    }
    catch (error) {
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    }
    finally {
      setIsLoading(false);
    }
  };

  const getWorkspaces = async () => {
    const response  = await pipelineActions.searchWorkSpaces("bitbucket", gitToolId, getAccessToken);

    console.log("workspaces: " + JSON.stringify(response));

    if (Array.isArray(response)) {
      setWorkspaces(response);
    }
  };

  if (!visible) {
    return <></>;
  }

  const getNoWorkspacesMessage = () => {
    if (!isLoading && (workspaces == null || workspaces.length === 0) && gitToolId !== "") {
      return ("Workspace information is missing or unavailable!");
    }
  };

  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        setDataFunction={setDataFunction}
        selectOptions={workspaces}
        busy={isLoading}
        placeholderText={getNoWorkspacesMessage()}
        valueField="value"
        textField="name"
        clearDataFunction={clearDataFunction}
        disabled={disabled || isLoading || workspaces.length === 0}
      />
    </div>
  );
}

BitbucketWorkspaceInput.propTypes = {
  service: PropTypes.string,
  gitToolId: PropTypes.string,
  repoId: PropTypes.string,
  workspace: PropTypes.string,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  clearDataFunction: PropTypes.func
};

BitbucketWorkspaceInput.defaultProps = {
  visible: true,
};

export default BitbucketWorkspaceInput;