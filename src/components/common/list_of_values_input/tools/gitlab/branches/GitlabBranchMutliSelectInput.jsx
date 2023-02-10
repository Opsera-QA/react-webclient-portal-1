import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {gitlabActions} from "components/inventory/tools/tool_details/tool_jobs/gitlab/gitlab.actions";
import _ from "lodash";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useComponentStateReference from "hooks/useComponentStateReference";

function GitlabBranchMultiSelectInput(
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
  const [isLoading, setIsLoading] = useState(false);
  const [gitlabBranches, setGitlabBranches] = useState([]);
  const [error, setError] = useState(undefined);
  const {
    cancelTokenSource,
    isMounted,
    getAccessToken,
  } = useComponentStateReference();

  useEffect(() => {
    setGitlabBranches([]);
    setError(undefined);

    if (isMongoDbId(toolId) === true && hasStringValue(repositoryId) === true) {
      loadData("").catch((error) => {
        throw error;
      });
    }
  }, [toolId, repositoryId]);

  const loadData = async (searchTerm) => {
    try {
      setError(undefined);
      setIsLoading(true);
      await loadGitlabBranches(searchTerm, toolId, repositoryId);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadGitlabBranches = async (searchTerm) => {
    const response = await gitlabActions.getBranchesFromGitlabInstanceV3(getAccessToken, cancelTokenSource, toolId, repositoryId, searchTerm);
    const branches = DataParsingHelper.parseNestedArray(response, "data.data");

    if (isMounted?.current === true && Array.isArray(branches)) {
      setGitlabBranches([...branches]);
    }
  };

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
      singularTopic={"Gitlab Branch"}
      pluralTopic={"Gitlab Branches"}
      supportSearchLookup={true}
      loadDataFunction={loadData}
    />
  );
}

GitlabBranchMultiSelectInput.propTypes = {
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

export default GitlabBranchMultiSelectInput;
