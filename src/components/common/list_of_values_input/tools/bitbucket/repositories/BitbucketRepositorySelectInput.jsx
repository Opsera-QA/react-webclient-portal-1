import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {bitbucketActions} from "components/inventory/tools/tool_details/tool_jobs/bitbucket/bitbucket.actions";
import {hasStringValue} from "components/common/helpers/string-helpers";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import useComponentStateReference from "hooks/useComponentStateReference";

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
  const [isLoading, setIsLoading] = useState(false);
  const [bitbucketRepositories, setBitbucketRepositories] = useState([]);
  const [error, setError] = useState(undefined);
  const [inEditMode, setInEditMode] = useState(false);
  const {
    cancelTokenSource,
    isMounted,
    getAccessToken,
  } = useComponentStateReference();

  useEffect(() => {
    setBitbucketRepositories([]);
    if (isMongoDbId(toolId) === true && hasStringValue(workspace) === true && inEditMode === true) {
      loadData("").catch((error) => {
        throw error;
      });
    }
  }, [toolId, workspace, inEditMode]);

  const loadData = async (
    searchTerm = "",
  ) => {
    try {
      setError(undefined);
      setIsLoading(true);
      await loadBitbucketRepositories(searchTerm);
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

  const loadBitbucketRepositories = async (
    searchTerm,
  ) => {
    const response = await bitbucketActions.getRepositoriesFromBitbucketInstanceV3(getAccessToken, cancelTokenSource, toolId, workspace, searchTerm);
    const repositories = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(repositories)) {
      setBitbucketRepositories([...repositories]);
      const existingRepository = model?.getData(fieldName);

      // if (hasStringValue(existingRepository) === true) {
      //   const existingRepositoryExists = repositories.find((repository) => repository[valueField] === existingRepository);
      //
      //   if (existingRepositoryExists == null) {
      //     setError(
      //       "Previously saved repository is no longer available. It may have been deleted. Please select another repository from the list.",
      //     );
      //   }
      // }
    }
  };

  const getDataPullLimitMessage = () => {
    return "The first 100 repositories will be loaded by default, please enter at least 3 characters to search for repositories by name.";
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      helpTooltipText={getDataPullLimitMessage()}
      setDataObject={setModel}
      selectOptions={bitbucketRepositories}
      busy={isLoading}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      valueField={valueField}
      textField={textField}
      disabled={disabled}
      singularTopic={"Bitbucket Repository"}
      pluralTopic={"Bitbucket Repositories"}
      error={error}
      requireUserEnable={true}
      onEnableEditFunction={() => setInEditMode(true)}
      supportSearchLookup={true}
      externalCacheToolId={toolId}
      loadDataFunction={loadData}
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
