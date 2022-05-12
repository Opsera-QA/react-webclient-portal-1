import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {hasStringValue} from "components/common/helpers/string-helpers";
import toolsActions from "../../../../../inventory/tools/tools-actions";

function GithubMonoRepositorySelectInput(
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
      await loadGithubMonoRepositories(cancelSource);
    } catch (error) {
      setPlaceholderText("No Repositories Available!");
      setErrorMessage("There was an error pulling Github Mono Repositories");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadGithubMonoRepositories = async (cancelSource = cancelTokenSource) => {
    const response = await toolsActions.getRoleLimitedToolByIdV3(getAccessToken, cancelSource, toolId);
    const repositories = response?.data?.data?.repositories;

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
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={githubRepositories}
      busy={isLoading}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      valueField={valueField}
      textField={textField}
      disabled={disabled}
      placeholder={placeholder}
      errorMessage={errorMessage}
    />
  );
}

GithubMonoRepositorySelectInput.propTypes = {
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

GithubMonoRepositorySelectInput.defaultProps = {
  valueField: "name",
  textField: "name",
};

export default GithubMonoRepositorySelectInput;
