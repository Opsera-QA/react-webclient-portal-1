import React, {useContext, useEffect, useRef, useState, useCallback} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {githubActions} from "components/inventory/tools/tool_details/tool_jobs/github/github.actions";
import {hasStringValue} from "components/common/helpers/string-helpers";
import LazyLoadSelectInputBase from "../../../../inputs/select/LazyLoadSelectInputBase";
import _ from "lodash";

function GithubRepositorySelectInput(
    {
      fieldName,
      model,
      setModel,
      toolId,
      disabled,
      setDataFunction,
      clearDataFunction,
      valueField,
      textField,
    }) {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [githubRepositories, setGithubRepositories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [placeholder, setPlaceholderText] = useState("Select Github Repository");
  const isMounted = useRef(false);
  const {getAccessToken} = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    isMounted.current = true;
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    setErrorMessage("");
    setGithubRepositories([]);

    if (isMongoDbId(toolId) === true) {
      loadData(source).catch((error) => {
        throw error;
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [toolId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadGithubRepositories("", toolId, cancelSource);
    } catch (error) {
      setPlaceholderText("No Repositories Available!");
      setErrorMessage("There was an error pulling Github Repositories");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadGithubRepositories = async (
      searchTerm,
      toolId,
      cancelSource = cancelTokenSource
  ) => {

    try {
      const response = await githubActions.getRepositoriesFromGithubInstanceV3(getAccessToken, cancelSource, toolId, searchTerm);
      const repositories = response?.data?.data;

      if (isMounted?.current === true && Array.isArray(repositories)) {
        setPlaceholderText("Select Github Repository");
        setGithubRepositories([...repositories]);

        const existingRepository = model?.getData(fieldName);

        if (hasStringValue(existingRepository) === true) {
          const existingRepositoryExists = repositories.find((repository) => repository[valueField] === existingRepository);

          if (existingRepositoryExists == null) {
            setErrorMessage(
                "Previously saved repository is no longer available. It may have been deleted. Please select another repository from the list."
            );
          }
        }
      }
    } catch(error) {
      if (isMounted?.current === true) {
        setErrorMessage(
            "Tool information is missing or unavailable! Please ensure the required credentials are registered and up to date in Tool Registry.",
        );
      }
      console.error(error);
    }finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getDataPullLimitMessage = () => {
    return "The first 100 repositories will be loaded by default, please enter at least 3 characters to search for repositories by name.";
  };

  const delayedSearchQuery = useCallback(
      _.debounce((searchTerm, toolId) => loadGithubRepositories(searchTerm, toolId), 600),
      [],
  );

  return (
      <LazyLoadSelectInputBase
          fieldName={fieldName}
          dataObject={model}
          helpTooltipText={getDataPullLimitMessage()}
          setDataObject={setModel}
          selectOptions={githubRepositories}
          busy={isLoading}
          setDataFunction={setDataFunction}
          clearDataFunction={clearDataFunction}
          valueField={valueField}
          textField={textField}
          disabled={disabled}
          singularTopic={"Github Repository"}
          pluralTopic={"Github Repositories"}
          error={errorMessage}
          onSearchFunction={(searchTerm) => delayedSearchQuery(searchTerm, toolId)}
          useToggle={true}
      />
  );
}

GithubRepositorySelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  toolId: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  valueField: PropTypes.string,
  textField: PropTypes.string,
};

GithubRepositorySelectInput.defaultProps = {
  valueField: "name",
  textField: "name",
};

export default GithubRepositorySelectInput;
