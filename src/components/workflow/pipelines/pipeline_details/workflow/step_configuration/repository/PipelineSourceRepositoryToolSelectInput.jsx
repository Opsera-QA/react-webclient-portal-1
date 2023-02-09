import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";

function PipelineSourceRepositoryToolSelectInput(
  {
    className,
    fieldName,
    model,
    setModel,
    disabled,
    sourceRepositoryToolIdentifier,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    model.setData("accountId", selectedOption?._id);
    model.setData("username", selectedOption?.configuration?.accountUsername);
    model.setData("password", selectedOption?.configuration?.accountPassword);
    model.setDefaultValue("workspace");
    model.setDefaultValue("workspaceName");
    model.setDefaultValue("repository");
    model.setDefaultValue("repoId");
    model.setDefaultValue("branch");
    setModel({...model});
  };

  const clearDataFunction = () => {
    model.setDefaultValue("accountId");
    model.setDefaultValue("username");
    model.setDefaultValue("password");
    model.setDefaultValue("workspace");
    model.setDefaultValue("workspaceName");
    model.setDefaultValue("repository");
    model.setDefaultValue("repoId");
    model.setDefaultValue("branch");
    setModel({...model});
  };

  const getTextField = (tool) => {
    const accountName = tool?.configuration?.accountUsername || "No Account Assigned";
    const toolName = tool?.name;

    return (`${toolName} (${accountName})`);
  };

  return (
    <RoleRestrictedToolByIdentifierInputBase
      toolIdentifier={sourceRepositoryToolIdentifier}
      toolFriendlyName={capitalizeFirstLetter(sourceRepositoryToolIdentifier)}
      fieldName={fieldName}
      placeholderText={"Select Tool"}
      configurationRequired={true}
      textField={(tool) => getTextField(tool)}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      disabled={disabled || sourceRepositoryToolIdentifier === "" || sourceRepositoryToolIdentifier == null}
      className={className}
    />
  );
}

PipelineSourceRepositoryToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  sourceRepositoryToolIdentifier: PropTypes.string,
};

PipelineSourceRepositoryToolSelectInput.defaultProps = {
  fieldName: "accountId",
};

export default PipelineSourceRepositoryToolSelectInput;