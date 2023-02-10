import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {gitlabActions} from "components/inventory/tools/tool_details/tool_jobs/gitlab/gitlab.actions";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import useComponentStateReference from "hooks/useComponentStateReference";

function GitlabBranchSelectInput(
  {
    fieldName,
    model,
    setModel,
    toolId,
    disabled,
    setDataFunction,
    clearDataFunction,
    repositoryId,
    multi
  }) {
  const [isLoading, setIsLoading] = useState(false);
  const [gitlabBranches, setGitlabBranches] = useState([]);
  const [error, setError] = useState(undefined);
  const [inEditMode, setInEditMode] = useState(false);
  const {
    cancelTokenSource,
    isMounted,
    getAccessToken,
  } = useComponentStateReference();

  useEffect(() => {
    setGitlabBranches([]);
    setError(undefined);

    if (
      isMongoDbId(toolId) === true
      && hasStringValue(repositoryId) === true
      && (multi || inEditMode === true)) {
      loadData().catch((error) => {
        throw error;
      });
    }
  }, [toolId, repositoryId, inEditMode]);

  const loadData = async (searchTerm = "") => {
    try {
      setError(undefined);
      setIsLoading(true);
      await loadGitlabBranches(searchTerm);
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

  const loadGitlabBranches = async (searchTerm) => {
    const response = await gitlabActions.getBranchesFromGitlabInstanceV3(getAccessToken, cancelTokenSource, toolId, repositoryId, searchTerm);
    const branches = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(branches)) {
      setGitlabBranches([...branches]);
    }
  };

  if (multi) {
    return (
      <MultiSelectInputBase
        fieldName={fieldName}
        dataObject={model}
        setDataObject={setModel}
        selectOptions={gitlabBranches}
        busy={isLoading}
        setDataFunction={setDataFunction}
        clearDataFunction={clearDataFunction}
        valueField={"name"}
        textField={"name"}
        disabled={disabled}
        error={error}
        filterOption={"startsWith"}
        pluralTopic={"Gitlab Branches"}
        singularTopic={"Gitlab Branch"}
        supportSearchLookup={true}
      />
    );
  }

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={gitlabBranches}
      busy={isLoading}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      valueField={"name"}
      textField={"name"}
      disabled={disabled}
      filterOption={"startsWith"}
      error={error}
      pluralTopic={"Gitlab Branches"}
      singularTopic={"Gitlab Branch"}
      supportSearchLookup={true}
      requireUserEnable={true}
      onEnableEditFunction={() => setInEditMode(true)}
      externalCacheToolId={toolId}
    />
  );
}

GitlabBranchSelectInput.propTypes = {
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
  repositoryId: PropTypes.string,
  multi: PropTypes.bool
};

export default GitlabBranchSelectInput;
