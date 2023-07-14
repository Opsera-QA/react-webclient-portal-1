import React from "react";
import RoleRestrictedToolByIdentifierInputBase from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";
import { capitalizeFirstLetter } from "components/common/helpers/string-helpers";
import PropTypes from "prop-types";

const ScmToScmMigrationTaskSourceGitToolIdSelectInput = ({
  model,
  setModel,
  disabled,
  toolIdentifier,
}) => {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = { ...model };
    newModel.setData("sourceGitToolId", selectedOption?._id);
    newModel.setDefaultValue("sourceWorkspace");
    newModel.setDefaultValue("repositoryMapList");
    setModel({ ...newModel });
  };

  const clearDataFunction = () => {
    let newModel = { ...model };
    newModel.setDefaultValue("sourceGitToolId");
    newModel.setDefaultValue("sourceWorkspace");
    newModel.setDefaultValue("repositoryMapList");
    setModel({ ...newModel });
  };

  return (
    <RoleRestrictedToolByIdentifierInputBase
      toolIdentifier={toolIdentifier}
      toolFriendlyName={capitalizeFirstLetter(toolIdentifier)}
      fieldName={"sourceGitToolId"}
      configurationRequired={true}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      disabled={disabled}
    />
  );
};

ScmToScmMigrationTaskSourceGitToolIdSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  toolIdentifier: PropTypes.string,
};

export default ScmToScmMigrationTaskSourceGitToolIdSelectInput;
