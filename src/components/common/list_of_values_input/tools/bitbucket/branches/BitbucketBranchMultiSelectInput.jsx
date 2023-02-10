import React, {useContext, useEffect, useRef, useState, useCallback} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {bitbucketActions} from "components/inventory/tools/tool_details/tool_jobs/bitbucket/bitbucket.actions";
import {hasStringValue} from "components/common/helpers/string-helpers";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import _ from "lodash";
import useComponentStateReference from "hooks/useComponentStateReference";

function BitbucketBranchMultiSelectInput(
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
  const [isLoading, setIsLoading] = useState(false);
  const [bitbucketBranches, setBitbucketBranches] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [placeholderText, setPlaceholderText] = useState("Select Bitbucket Branches");
  const {
    cancelTokenSource,
    isMounted,
    getAccessToken,
  } = useComponentStateReference();

  useEffect(() => {
    setBitbucketBranches([]);
    setErrorMessage("");
    setPlaceholderText("Select Bitbucket Branch");

    if (isMongoDbId(toolId) === true && hasStringValue(workspace) === true && hasStringValue(repositoryId) === true) {
      loadData().catch((error) => {
        throw error;
      });
    }
  }, [toolId, workspace, repositoryId]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await loadBitbucketBranches();
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
      setPlaceholderText("Select Bitbucket Branches");
      setBitbucketBranches([...branches]);
    }
  };

  return (
    <MultiSelectInputBase
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
      singularTopic={"Branch"}
      pluralTopic={"Branches"}
      loadDataFunction={loadData}
    />
  );
}

BitbucketBranchMultiSelectInput.propTypes = {
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
  workspace: PropTypes.string,
  repositoryId: PropTypes.string,
};

export default BitbucketBranchMultiSelectInput;
