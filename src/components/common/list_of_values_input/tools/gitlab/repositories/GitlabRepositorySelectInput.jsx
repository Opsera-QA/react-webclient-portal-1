import React, {
  useEffect,
  useState,
} from "react";
import PropTypes from "prop-types";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import { gitlabActions } from "components/inventory/tools/tool_details/tool_jobs/gitlab/gitlab.actions";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import useComponentStateReference from "hooks/useComponentStateReference";

function GitlabRepositorySelectInput({
  fieldName,
  model,
  setModel,
  toolId,
  disabled,
  setDataFunction,
  clearDataFunction,
  valueField,
  textField,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [gitlabRepositories, setGitlabRepositories] = useState([]);
  const [error, setError] = useState(undefined);
  const [inEditMode, setInEditMode] = useState(false);
  const {
    cancelTokenSource,
    isMounted,
    getAccessToken,
  } = useComponentStateReference();

  useEffect(() => {
    setGitlabRepositories([]);

    if (isMongoDbId(toolId) === true && inEditMode === true) {
      loadData("").catch((error) => {
        throw error;
      });
    }
  }, [toolId, inEditMode]);

  const loadData = async (searchTerm = "") => {
    try {
      setError(undefined);
      setIsLoading(true);
      await loadGitlabRepositories(
        searchTerm,
      );
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

  const loadGitlabRepositories = async (
    searchTerm,
  ) => {
    const response = await gitlabActions.getRepositoriesFromGitlabInstanceV3(
      getAccessToken,
      cancelTokenSource,
      searchTerm,
      toolId,
    );
    const repositories = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(repositories)) {
      setGitlabRepositories([...repositories]);
      const existingRepository = model?.getData(fieldName);

      // if (hasStringValue(existingRepository) === true) {
      //   const existingRepositoryExists = repositories.find(
      //     (repository) => repository[valueField] === existingRepository,
      //   );
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
      selectOptions={gitlabRepositories}
      busy={isLoading}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      valueField={valueField}
      textField={textField}
      disabled={disabled}
      singularTopic={"Gitlab Repository"}
      pluralTopic={"Gitlab Repositories"}
      error={error}
      requireUserEnable={true}
      onEnableEditFunction={() => setInEditMode(true)}
      externalCacheToolId={toolId}
      loadDataFunction={loadData}
      supportSearchLookup={true}
    />
  );
}

GitlabRepositorySelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  toolId: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  valueField: PropTypes.string,
  textField: PropTypes.string,
};

GitlabRepositorySelectInput.defaultProps = {
  valueField: "id",
  textField: "nameSpacedPath",
};

export default GitlabRepositorySelectInput;
