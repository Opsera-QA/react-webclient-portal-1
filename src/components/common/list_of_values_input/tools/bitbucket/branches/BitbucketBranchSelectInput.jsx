import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import { bitbucketActions } from "components/inventory/tools/tool_details/tool_jobs/bitbucket/bitbucket.actions";
import { hasStringValue } from "components/common/helpers/string-helpers";
import _ from "lodash";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import ExactMatchSearchSelectInputBase from "components/common/inputs/select/ExactMatchSearchSelectInputBase";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

function BitbucketRepositorySelectInput({
  fieldName,
  model,
  setModel,
  toolId,
  disabled,
  setDataFunction,
  clearDataFunction,
  workspace,
  repositoryId,
  multi,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [bitbucketBranches, setBitbucketBranches] = useState([]);
  const [error, setError] = useState(undefined);
  const [inEditMode, setInEditMode] = useState(false);
  const { cancelTokenSource, isMounted, getAccessToken } =
    useComponentStateReference();

  useEffect(() => {
    setBitbucketBranches([]);
    setError(undefined);

    if (
      isMongoDbId(toolId) === true &&
      hasStringValue(workspace) === true &&
      hasStringValue(repositoryId) === true &&
      (inEditMode === true || multi)
    ) {
      loadData().catch((error) => {
        throw error;
      });
    }
  }, [toolId, workspace, repositoryId, inEditMode]);

  const loadData = async (searchTerm = "") => {
    try {
      setError(undefined);
      setIsLoading(true);
      await loadBitbucketBranches(searchTerm);
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

  const loadBitbucketBranches = async (searchTerm = "") => {
    const response = await bitbucketActions.getBranchesFromBitbucketInstanceV3(
      getAccessToken,
      cancelTokenSource,
      toolId,
      workspace,
      repositoryId,
      searchTerm,
    );

    const branches = DataParsingHelper.parseNestedArray(
      response,
      "data.data",
      [],
    );

    if (isMounted?.current === true && Array.isArray(branches)) {
      const result = branches?.map((branch) => {
        return { name: branch };
      });

      if (searchTerm.length > 0 && !branches.includes(searchTerm)) {
        result.unshift({ name: searchTerm, OPSERA_DIRECT_LOOKUP_NEEDED: true });
      }

      setBitbucketBranches([...result]);
    }
  };

  const exactMatchSearch = async (branch) => {
    const response = await bitbucketActions.getBranch(
      getAccessToken,
      cancelTokenSource,
      toolId,
      workspace,
      repositoryId,
      branch?.name,
    );

    const branchResult = response?.data?.data?.branch;

    return branchResult;
  };

  if (multi) {
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
        filterOption={"startsWith"}
        textField={"name"}
        disabled={disabled}
        error={error}
        pluralTopic={"Bitbucket Branches"}
        singularTopic={"Bitbucket Branch"}
        supportSearchLookup={true}
        loadDataFunction={loadData}
      />
    );
  }

  return (
    <ExactMatchSearchSelectInputBase
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
      filterOption={"startsWith"}
      error={error}
      pluralTopic={"Bitbucket Branches"}
      singularTopic={"Bitbucket Branch"}
      requireUserEnable={true}
      supportSearchLookup={true}
      onEnableEditFunction={() => setInEditMode(true)}
      externalCacheToolId={toolId}
      loadDataFunction={loadData}
      exactMatchSearch={exactMatchSearch}
    />
  );
}

BitbucketRepositorySelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  toolId: PropTypes.string,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  workspace: PropTypes.string,
  repositoryId: PropTypes.string,
  multi: PropTypes.bool,
};

export default BitbucketRepositorySelectInput;
