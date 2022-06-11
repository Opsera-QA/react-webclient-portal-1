import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";
import { capitalizeFirstLetter } from "components/common/helpers/string-helpers";

function SalesforceToGitMergeSyncTaskSourceControlToolSelectInput({
  model,
  setModel,
  disabled,
  toolIdentifier,
}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = { ...model };
    newModel.setData("toolId", selectedOption?._id);
    newModel.setDefaultValue("gitUrl");
    newModel.setDefaultValue("workspace");
    newModel.setDefaultValue("repository");
    newModel.setDefaultValue("repoId");
    newModel.setDefaultValue("targetBranch");
    newModel.setDefaultValue("sourceBranch");
    newModel.setDefaultValue("upstreamBranch");
    newModel.setDefaultValue("isNewBranch");
    setModel({ ...newModel });
  };

  const clearDataFunction = () => {
    let newModel = { ...model };
    newModel.setDefaultValue("toolId");
    newModel.setDefaultValue("gitUrl");
    newModel.setDefaultValue("workspace");
    newModel.setDefaultValue("repository");
    newModel.setDefaultValue("repoId");
    newModel.setDefaultValue("targetBranch");
    newModel.setDefaultValue("sourceBranch");
    newModel.setDefaultValue("upstreamBranch");
    newModel.setDefaultValue("isNewBranch");
    setModel({ ...newModel });
  };

  return (
    <RoleRestrictedToolByIdentifierInputBase
      toolIdentifier={toolIdentifier}
      toolFriendlyName={capitalizeFirstLetter(toolIdentifier)}
      fieldName={"toolId"}
      configurationRequired={true}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      disabled={disabled}
    />
  );
}

SalesforceToGitMergeSyncTaskSourceControlToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  toolIdentifier: PropTypes.string,
};

export default SalesforceToGitMergeSyncTaskSourceControlToolSelectInput;
