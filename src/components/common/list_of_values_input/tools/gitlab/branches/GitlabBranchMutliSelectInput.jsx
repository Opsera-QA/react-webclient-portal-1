import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {gitlabActions} from "components/inventory/tools/tool_details/tool_jobs/gitlab/gitlab.actions";
import _ from "lodash";
import LazyLoadMultiSelectInputBase from "../../../../inputs/select/LazyLoadMultiSelectInputBase";

function GitlabBranchSelectInput(
  {
    fieldName,
    model,
    setModel,
    toolId,
    disabled,
    setDataFunction,
    clearDataFunction,
    repositoryId,
  }) {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [gitlabBranches, setGitlabBranches] = useState([]);
  const [inEditMode, setInEditMode] = useState(false);
  const [error, setError] = useState(undefined);
  const isMounted = useRef(false);
  const {getAccessToken} = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    isMounted.current = true;
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    setGitlabBranches([]);
    setError(undefined);

    if (isMongoDbId(toolId) === true && hasStringValue(repositoryId) === true && inEditMode === true) {
      loadData(source).catch((error) => {
        throw error;
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [toolId, repositoryId, inEditMode]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadGitlabBranches("", toolId, repositoryId, cancelSource);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadGitlabBranches = async (searchTerm, toolId, repositoryId, cancelSource = cancelTokenSource) => {
    // const response = await gitlabActions.getBranchesFromGitlabInstanceV2(getAccessToken, cancelSource, toolId, repositoryId);
    const response = await gitlabActions.getBranchesFromGitlabInstanceV3(getAccessToken, cancelSource, toolId, repositoryId, searchTerm);
    const branches = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(branches)) {
      setGitlabBranches([...branches]);
    }
  };

  const delayedSearchQuery = useCallback(
      _.debounce((searchTerm, repositoryId, toolId) => loadGitlabBranches(searchTerm, toolId, repositoryId), 600),
      [],
  );

  return (
    <LazyLoadMultiSelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={gitlabBranches}
      busy={isLoading}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      valueField={"name"}
      textField={"name"}
      disabled={disabled}
      error={error}
      singularTopic={"Gitlab Branch"}
      pluralTopic={"Gitlab Branches"}
      onSearchFunction={(searchTerm) => delayedSearchQuery(searchTerm, repositoryId, toolId)}
      useToggle={true}
      requireUserEnable={true}
      onEnableEditFunction={() => setInEditMode(true)}
    />
  );
}

GitlabBranchSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  toolId: PropTypes.string.isRequired,
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  repositoryId: PropTypes.string,
};

export default GitlabBranchSelectInput;
