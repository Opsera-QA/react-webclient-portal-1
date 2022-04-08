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
    repositoryId,
  }) {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [bitbucketBranches, setBitbucketBranches] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [placeholderText, setPlaceholderText] = useState("Select Bitbucket Branch");
  const isMounted = useRef(false);
  const {getAccessToken} = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    isMounted.current = true;
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    setBitbucketBranches([]);
    setErrorMessage("");
    setPlaceholderText("Select Bitbucket Branch");

    if (isMongoDbId(toolId) === true && hasStringValue(workspace) === true && hasStringValue(repositoryId) === true) {
      loadData(source).catch((error) => {
        throw error;
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [toolId, workspace, repositoryId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadBitbucketBranches(cancelSource);
    } catch (error) {
      setPlaceholderText("No Branches Available!");
      setErrorMessage("There was an error pulling Bitbucket Branches");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadBitbucketBranches = async (cancelSource = cancelTokenSource) => {
    const response = await bitbucketActions.getBranchesFromBitbucketInstanceV2(getAccessToken, cancelSource, toolId, workspace, repositoryId);
    const branches = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(branches)) {
      setPlaceholderText("Select Bitbucket Branch");
      setBitbucketBranches([...branches]);
    }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={bitbucketBranches}
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

BitbucketRepositorySelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  toolId: PropTypes.string,
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  workspace: PropTypes.string,
  repositoryId: PropTypes.string,
};

export default BitbucketRepositorySelectInput;
