import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {githubActions} from "components/inventory/tools/tool_details/tool_jobs/github/github.actions";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";

function GithubBranchMultiSelectInput(
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
  const [githubBranches, setGithubBranches] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [placeholderText, setPlaceholderText] = useState("Select Github Branches");
  const isMounted = useRef(false);
  const {getAccessToken} = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    isMounted.current = true;
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    setGithubBranches([]);
    setErrorMessage("");
    setPlaceholderText("Select Github Branches");

    if (isMongoDbId(toolId) === true && hasStringValue(repositoryId) === true) {
      loadData(source).catch((error) => {
        throw error;
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [toolId, repositoryId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadGithubBranches(cancelSource);
    } catch (error) {
      setPlaceholderText("No Branches Available!");
      setErrorMessage("There was an error pulling Github Branches");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadGithubBranches = async (cancelSource = cancelTokenSource) => {
    const response = await githubActions.getBranchesFromGithubInstanceV2(getAccessToken, cancelSource, toolId, repositoryId);
    const branches = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(branches)) {
      setPlaceholderText("Select Github Branches");
      setGithubBranches([...branches]);
    }
  };

  return (
    <MultiSelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={githubBranches}
      busy={isLoading}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      valueField={"name"}
      textField={"name"}
      disabled={disabled}
      placeholderText={placeholderText}
      errorMessage={errorMessage}
    />
  );
}

GithubBranchMultiSelectInput.propTypes = {
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

export default GithubBranchMultiSelectInput;
