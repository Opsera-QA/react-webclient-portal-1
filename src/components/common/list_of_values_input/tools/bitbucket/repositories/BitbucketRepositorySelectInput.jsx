import React, {useContext, useEffect, useRef, useState, useCallback} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {bitbucketActions} from "components/inventory/tools/tool_details/tool_jobs/bitbucket/bitbucket.actions";
import {hasStringValue} from "components/common/helpers/string-helpers";
import LazyLoadSelectInputBase from "../../../../inputs/select/LazyLoadSelectInputBase";
import _ from "lodash";
import useComponentStateReference from "hooks/useComponentStateReference";

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

    if (isMongoDbId(toolId) === true && hasStringValue(workspace) === true) {
      loadData("", toolId, cancelSource).catch((error) => {
        throw error;
      });
    }

    return () => {
      cancelSource.cancel();
      isMounted.current = false;
    };
  }, [toolId, workspace]);

  const loadData = async (
    searchTerm = "",
    currentToolId = toolId,
    cancelSource = cancelTokenSource,
  ) => {
    try {
      setError(undefined);
      setIsLoading(true);
      await loadBitbucketRepositories(searchTerm, currentToolId, cancelSource);
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
      const existingRepository = model?.getData(fieldName);

      if (hasStringValue(existingRepository) === true) {
        const existingRepositoryExists = repositories.find((repository) => repository[valueField] === existingRepository);

        if (existingRepositoryExists == null) {
          setError(
            "Previously saved repository is no longer available. It may have been deleted. Please select another repository from the list.",
          );
        }
      }
    }
  };

  const getDataPullLimitMessage = () => {
    return "The first 100 repositories will be loaded by default, please enter at least 3 characters to search for repositories by name.";
  };

  const delayedSearchQuery = useCallback(
      _.debounce((searchTerm) => loadData(searchTerm, toolId), 600),
      [],
  );

  return (
    <LazyLoadSelectInputBase
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
      useToggle={true}
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
