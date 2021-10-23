import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import pipelineActions from "components/workflow/pipeline-actions";
import axios from "axios";

// TODO: If the workspaces are used by different tools make more generic version
function BitbucketWorkspaceInput({ gitToolId, visible, fieldName, dataObject, setDataObject, setDataFunction, clearDataFunction, disabled, className}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [workspaces, setWorkspaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setWorkspaces([]);

    if (gitToolId != null && gitToolId !== "") {
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
  }, [gitToolId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getWorkspaces(cancelSource);
    }
    catch (error) {
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    }
    finally {
      setIsLoading(false);
    }
  };

  const getWorkspaces = async (cancelSource = cancelTokenSource) => {
    const response = await pipelineActions.searchWorkspacesV2(getAccessToken, cancelSource, "bitbucket", gitToolId);
    const workspaces = response?.data?.data;

    if (Array.isArray(workspaces)) {
      setWorkspaces(workspaces);
    }
  };

  if (visible === false) {
    return null;
  }

  const getNoWorkspacesMessage = () => {
    if (!isLoading && (workspaces == null || workspaces.length === 0) && gitToolId !== "") {
      return ("Workspace information is missing or unavailable! Please ensure the required credentials are registered and up to date in Tool Registry.");
    }
  };

  return (
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
      className={className}
    />
  );
}

BitbucketWorkspaceInput.propTypes = {
  gitToolId: PropTypes.string,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  clearDataFunction: PropTypes.func,
  className: PropTypes.string,
};

export default BitbucketWorkspaceInput;