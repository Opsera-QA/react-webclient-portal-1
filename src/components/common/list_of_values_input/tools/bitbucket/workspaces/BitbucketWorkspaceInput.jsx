import React, {useContext, useEffect, useRef, useState, useCallback} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import {bitbucketActions} from "components/inventory/tools/tool_details/tool_jobs/bitbucket/bitbucket.actions";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import _ from "lodash";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

// TODO: Rename BitbucketWorkspaceSelectInput, change "gitToolId" to "toolId"
function BitbucketWorkspaceInput({ gitToolId, visible, fieldName, dataObject, setDataObject, setDataFunction, clearDataFunction, disabled, className}) {
  const { getAccessToken } = useContext(AuthContext);
  const [workspaces, setWorkspaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const isMounted = useRef(false);
  const [inEditMode, setInEditMode] = useState(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setError(undefined);
    setWorkspaces([]);

    if (isMongoDbId(gitToolId) === true && inEditMode === true) {
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
  }, [gitToolId, inEditMode]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getWorkspaces(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        setError(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getWorkspaces = async (cancelSource = cancelTokenSource) => {
    const response = await bitbucketActions.getWorkspacesFromBitbucketInstanceV2(getAccessToken, cancelSource, gitToolId);
    const workspaces = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(workspaces)) {
      setWorkspaces(workspaces);
    }
  };

  const delayedSearchQuery = useCallback(
      _.debounce(
          () =>
              getWorkspaces(),
          600,
      ),
      [],
  );

  if (visible === false) {
    return null;
  }

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={setDataFunction}
      selectOptions={workspaces}
      busy={isLoading}
      valueField={"key"}
      textField={"name"}
      error={error}
      clearDataFunction={clearDataFunction}
      disabled={disabled || isLoading || workspaces.length === 0}
      className={className}
      onSearchFunction={(searchTerm) =>
          delayedSearchQuery(searchTerm)
      }
      requireUserEnable={true}
      onEnableEditFunction={() => setInEditMode(true)}
      singularTopic={"Workspace"}
      pluralTopic={"Workspaces"}
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