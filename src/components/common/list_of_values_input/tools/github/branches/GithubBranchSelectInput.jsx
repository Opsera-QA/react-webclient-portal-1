import React, {
  useEffect,
  useState,
} from "react";
import PropTypes from "prop-types";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {githubActions} from "components/inventory/tools/tool_details/tool_jobs/github/github.actions";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import useComponentStateReference from "hooks/useComponentStateReference"
import ExactMatchSearchSelectInputBase from "components/common/inputs/select/ExactMatchSearchSelectInputBase";

function GithubBranchSelectInput(
  {
    fieldName,
    model,
    setModel,
    toolId,
    disabled,
    setDataFunction,
    clearDataFunction,
    repositoryId,
    multi,
  }) {
  const [isLoading, setIsLoading] = useState(false);
  const [githubBranches, setGithubBranches] = useState([]);
  const [error, setError] = useState(undefined);
  const [inEditMode, setInEditMode] = useState(false);
  const [requiresLookup, setRequiresLookup] = useState(true);
  const {
    cancelTokenSource,
    isMounted,
    getAccessToken,
  } = useComponentStateReference();

  useEffect(() => {
    setGithubBranches([]);
    setError(undefined);

    if (
      isMongoDbId(toolId) === true
      && hasStringValue(repositoryId) === true
      && (inEditMode === true || multi)
    ) {
      loadData().catch((error) => {
        throw error;
      });
    }
  }, [toolId, repositoryId, inEditMode]);

  const loadData = async (searchTerm = "") => {
    try {
      setError(undefined);
      setIsLoading(true);
      await loadGithubBranches(searchTerm);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadGithubBranches = async (searchTerm) => {
    setIsLoading(true);
    const response = await githubActions.getBranchesFromGithubInstanceV3(
      getAccessToken,
      cancelTokenSource,
      toolId,
      repositoryId,
      searchTerm,
    );
    const branches = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(branches)) {

      if(branches.includes(searchTerm)) {
        setRequiresLookup(false);
      }

      searchTerm.length > 0 ? branches.unshift(searchTerm): null; 
      setGithubBranches([...branches]);
    }
    setIsLoading(false);
  };

  const branchExactMatchSearch = async (branch) => {
    setError(undefined);
    const response = await githubActions.getBranch(
      getAccessToken,
      cancelTokenSource,
      toolId,
      repositoryId,
      branch,
    );

    const branchResult = response?.data?.data?.branch;

    if (!branchResult){
     setError("Unable to find exact match for this branch")
    } 
  };

  if (multi) {
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
        filterOption={"startsWith"}
        disabled={disabled}
        error={error}
        pluralTopic={"Github Branches"}
        loadDataFunction={loadData}
        supportSearchLookup={true}
      />
    );
  }

  return (
    <ExactMatchSearchSelectInputBase
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
      filterOption={"startsWith"}
      error={error}
      pluralTopic={"Github Branches"}
      singularTopic={"Github Branch"}
      loadDataFunction={loadData}
      supportSearchLookup={true}
      requireUserEnable={true}
      onEnableEditFunction={() => setInEditMode(true)}
      requiresLookup={requiresLookup}
      branchExactMatchSearch={branchExactMatchSearch}
    />
  );
}

GithubBranchSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  toolId: PropTypes.string,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  repositoryId: PropTypes.string,
  multi: PropTypes.bool,
};

export default GithubBranchSelectInput;
