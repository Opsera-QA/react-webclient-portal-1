import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {bitbucketActions} from "components/inventory/tools/tool_details/tool_jobs/bitbucket/bitbucket.actions";
import {hasStringValue} from "components/common/helpers/string-helpers";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";

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
    multi
  }) {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [bitbucketBranches, setBitbucketBranches] = useState([]);
  const [error, setError] = useState(undefined);
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
    setError(undefined);

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
      if (isMounted?.current === true) {
        setError(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadBitbucketBranches = async (cancelSource = cancelTokenSource) => {
    const response = await bitbucketActions.getBranchesFromBitbucketInstanceV2(getAccessToken, cancelSource, toolId, workspace, repositoryId);
    const branches = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(branches)) {
      setBitbucketBranches([...branches]);
    }
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
        textField={"name"}
        disabled={disabled}
        error={error}
        pluralTopic={"Bitbucket Branches"}
        singularTopic={"Bitbucket Branch"}
      />
    );
  }

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
      error={error}
      pluralTopic={"Bitbucket Branches"}
      singularTopic={"Bitbucket Branch"}
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
    PropTypes.array
  ]),
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  workspace: PropTypes.string,
  repositoryId: PropTypes.string,
  multi: PropTypes.bool
};

export default BitbucketRepositorySelectInput;
