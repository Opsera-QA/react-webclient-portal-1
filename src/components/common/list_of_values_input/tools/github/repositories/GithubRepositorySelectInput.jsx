import React, { useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import useGetGithubRepositories from "hooks/tools/github/useGetGithubRepositories";

function GithubRepositorySelectInput(
  {
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
  const [inEditMode, setInEditMode] = useState(false);
  const {
    githubRepositories,
    isLoading,
    error,
    loadData,
  } = useGetGithubRepositories(inEditMode, toolId);

  const getDataPullLimitMessage = () => {
    return "The first 100 repositories will be loaded by default, please enter at least 3 characters to search for repositories by name.";
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      helpTooltipText={getDataPullLimitMessage()}
      setDataObject={setModel}
      selectOptions={githubRepositories}
      busy={isLoading}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      valueField={valueField}
      textField={textField}
      disabled={disabled}
      singularTopic={"Github Repository"}
      pluralTopic={"Github Repositories"}
      error={error}
      requireUserEnable={true}
      onEnableEditFunction={() => setInEditMode(true)}
      externalCacheToolId={toolId}
      loadDataFunction={(searchTerm) => loadData(searchTerm)}
      supportSearchLookup={true}
    />
  );
}

GithubRepositorySelectInput.propTypes = {
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

GithubRepositorySelectInput.defaultProps = {
  valueField: "id",
  textField: "name",
};

export default GithubRepositorySelectInput;
