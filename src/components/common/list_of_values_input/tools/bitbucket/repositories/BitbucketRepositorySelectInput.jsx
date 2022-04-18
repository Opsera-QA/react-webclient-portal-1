import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {bitbucketActions} from "components/inventory/tools/tool_details/tool_jobs/bitbucket/bitbucket.actions";
import {hasStringValue} from "components/common/helpers/string-helpers";

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
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [bitbucketRepositories, setBitbucketRepositories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [placeholder, setPlaceholderText] = useState("Select Bitbucket Repository");
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
    setBitbucketRepositories([]);
    setPlaceholderText("Select Bitbucket Repository");

    if (isMongoDbId(toolId) === true && hasStringValue(workspace) === true) {
      loadData(source).catch((error) => {
        throw error;
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [toolId, workspace]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadBitbucketRepositories(cancelSource);
    } catch (error) {
      setPlaceholderText("No Repositories Available!");
      setErrorMessage("There was an error pulling Bitbucket Repositories");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadBitbucketRepositories = async (cancelSource = cancelTokenSource) => {
    const response = await bitbucketActions.getRepositoriesFromBitbucketInstanceV2(getAccessToken, cancelSource, toolId, workspace);
    const repositories = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(repositories)) {
      setBitbucketRepositories([...repositories]);

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
      selectOptions={bitbucketRepositories}
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
