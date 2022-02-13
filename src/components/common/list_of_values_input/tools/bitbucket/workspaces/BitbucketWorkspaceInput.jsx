import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import pipelineActions from "components/workflow/pipeline-actions";
import axios from "axios";
import {bitbucketActions} from "components/inventory/tools/tool_details/tool_jobs/bitbucket/bitbucket.actions";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {parseError} from "components/common/helpers/error-helpers";

// TODO: Rename BitbucketWorkspaceSelectInput, change "gitToolId" to "toolId"
function BitbucketWorkspaceInput({ gitToolId, visible, fieldName, dataObject, setDataObject, setDataFunction, clearDataFunction, disabled, className}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [workspaces, setWorkspaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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

    if (isMongoDbId(gitToolId) === true) {
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
      const parsedError = parseError(error);
      setErrorMessage(`Error pulling Bitbucket Workspaces: ${parsedError}`);
    }
    finally {
      setIsLoading(false);
    }
  };

  const getWorkspaces = async (cancelSource = cancelTokenSource) => {
    const response = await bitbucketActions.getWorkspacesFromBitbucketInstanceV2(getAccessToken, cancelSource, gitToolId);
    const workspaces = response?.data?.data;

    if (Array.isArray(workspaces)) {
      setWorkspaces(workspaces);
    }
  };

  if (visible === false) {
    return null;
  }

  const getNoWorkspacesMessage = () => {
    if (!isLoading && (workspaces == null || workspaces.length === 0) && isMongoDbId(gitToolId) !== true) {
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
      valueField={"key"}
      textField={"name"}
      errorMessage={errorMessage}
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