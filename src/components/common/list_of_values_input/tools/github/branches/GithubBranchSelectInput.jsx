import React, {
  useEffect,
  useState,
} from "react";
import PropTypes from "prop-types";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {githubActions} from "components/inventory/tools/tool_details/tool_jobs/github/github.actions";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import useComponentStateReference from "hooks/useComponentStateReference";

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
  }, [toolId, repositoryId]);

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
      setGithubBranches([...branches]);
    }
    setIsLoading(false);
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
    <SelectInputBase
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
