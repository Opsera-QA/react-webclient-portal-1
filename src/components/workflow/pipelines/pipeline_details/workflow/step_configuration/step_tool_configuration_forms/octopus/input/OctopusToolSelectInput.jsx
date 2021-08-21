import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";

function OctopusToolSelectInput({className, fieldName, model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("octopusToolId", selectedOption?._id);
    newModel.setData("toolURL", selectedOption?.configuration?.toolURL);
    newModel.setData("octopusApiKey", selectedOption?.configuration?.octopusApiKey);
    setModel({...newModel});
  };

  const getTextField = (tool) => {
    const toolUrl = tool?.configuration?.toolURL || "No Octopus URL Assigned";
    const toolName = tool?.name;

    return (`${toolName} (${toolUrl})`);
  };

  return (
    <RoleRestrictedToolByIdentifierInputBase
      toolIdentifier={"octopus"}
      toolFriendlyName={"Octopus"}
      fieldName={fieldName}
      placeholderText={"Select Octopus Tool"}
      configurationRequired={true}
      textField={(tool) => getTextField(tool)}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      disabled={disabled}
      className={className}
    />
  );
}

OctopusToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  sourceRepositoryToolIdentifier: PropTypes.string,
};

OctopusToolSelectInput.defaultProps = {
  fieldName: "octopusToolId",
};

export default OctopusToolSelectInput;