import React, {useContext, useEffect, useRef, useState, useCallback} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {bitbucketActions} from "components/inventory/tools/tool_details/tool_jobs/bitbucket/bitbucket.actions";
import {hasStringValue} from "components/common/helpers/string-helpers";
import _ from "lodash";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function BitbucketRepositorySelectInput(
    {
      fieldName,
      model,
      setModel,
      toolId,
      disabled,
      setDataFunction,
      clearDataFunction,
      workspace,
      valueField,
      textField,
    }) {
  const [isLoading, setIsLoading] = useState(false);
  const [bitbucketRepositories, setBitbucketRepositories] = useState([]);
  const [error, setError] = useState("");
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [inEditMode, setInEditMode] = useState(false);
  const isMounted = useRef(false);
  const {getAccessToken} = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    isMounted.current = true;
    const cancelSource = axios.CancelToken.source();
    setBitbucketRepositories([]);
    setCancelTokenSource(cancelSource);

    if (isMongoDbId(toolId) === true && hasStringValue(workspace) === true && inEditMode === true) {
      loadData("", toolId, cancelSource).catch((error) => {
        throw error;
      });
    }

    return () => {
      cancelSource.cancel();
      isMounted.current = false;
    };
  }, [toolId, workspace, inEditMode]);

  const loadData = async (
    searchTerm = "",
    currentToolId = toolId,
    cancelSource = cancelTokenSource,
  ) => {
    try {
      setError(undefined);
      setIsLoading(true);
      let defaultSearchTerm = searchTerm;
      const existingRepository = model?.getData("repositoryName") || model?.getData("gitRepository") || model?.getData("repository");
      // console.log(existingRepository);
      if ((defaultSearchTerm === "") && (hasStringValue(existingRepository) === true)) {
        defaultSearchTerm = existingRepository;
      }
      await loadBitbucketRepositories(defaultSearchTerm, currentToolId, cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        setError(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadBitbucketRepositories = async (
    searchTerm,
    toolId,
    cancelSource = cancelTokenSource,
  ) => {
    const response = await bitbucketActions.getRepositoriesFromBitbucketInstanceV3(getAccessToken, cancelSource, toolId, workspace, searchTerm);
    const repositories = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(repositories)) {
      setBitbucketRepositories([...repositories]);
    }
  };

  const getDataPullLimitMessage = () => {
    return "The first 100 repositories will be loaded by default, please enter at least 3 characters to search for repositories by name.";
  };

  const delayedSearchQuery = useCallback(
      _.debounce((searchTerm, toolId) => loadData(searchTerm, toolId), 600),
      [],
  );

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      helpTooltipText={getDataPullLimitMessage()}
      setDataObject={setModel}
      selectOptions={bitbucketRepositories}
      busy={isLoading}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      valueField={valueField}
      textField={textField}
      disabled={disabled}
      singularTopic={"Bitbucket Repository"}
      pluralTopic={"Bitbucket Repositories"}
      error={error}
      onSearchFunction={(searchTerm) => delayedSearchQuery(searchTerm, toolId)}
      requireUserEnable={true}
      onEnableEditFunction={() => setInEditMode(true)}
    />
  );
}

BitbucketRepositorySelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  toolId: PropTypes.string,
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  workspace: PropTypes.string,
  valueField: PropTypes.string,
  textField: PropTypes.string,
};

BitbucketRepositorySelectInput.defaultProps = {
  valueField: "name",
  textField: "name",
};

export default BitbucketRepositorySelectInput;
