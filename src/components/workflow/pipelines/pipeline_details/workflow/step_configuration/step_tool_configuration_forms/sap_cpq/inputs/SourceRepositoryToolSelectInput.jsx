import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";

function SourceRepositoryToolSelectInput({className, fieldName, model, setModel, disabled, sourceRepositoryToolIdentifier}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("gitToolId", selectedOption?._id);
    newModel.setData("workspace", "");
    newModel.setData("repository", "");
    newModel.setData("gitBranch", "");
    setModel({...newModel});
  };

  const getTextField = (tool) => {
    const accountName = tool?.configuration?.accountUsername || "No Account Assigned";
    const toolName = tool?.name;

    return (`${accountName} (${toolName})`);
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
      disabled={disabled || sourceRepositoryToolIdentifier === "" || sourceRepositoryToolIdentifier == null}
      className={className}
    />
  );
}

SourceRepositoryToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  sourceRepositoryToolIdentifier: PropTypes.string,
};

SourceRepositoryToolSelectInput.defaultProps = {
  fieldName: "gitToolId",
};

export default SourceRepositoryToolSelectInput;