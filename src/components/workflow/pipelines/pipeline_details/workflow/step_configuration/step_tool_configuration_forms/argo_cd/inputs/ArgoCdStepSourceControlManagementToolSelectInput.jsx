import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";

function ArgoCdStepSourceControlManagementToolSelectInput({className, fieldName, model, setModel, disabled, gitYamlTool}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("gitToolId", selectedOption?._id);
    setModel({...newModel});
  };

  return (
    <RoleRestrictedToolByIdentifierInputBase
      toolIdentifier={gitYamlTool}
      toolFriendlyName={capitalizeFirstLetter(gitYamlTool)}
      fieldName={fieldName}
      placeholderText={"Select Source Control Management Tool"}
      configurationRequired={true}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      disabled={disabled || gitYamlTool === "" || gitYamlTool == null}
      className={className}
    />
  );
}

ArgoCdStepSourceControlManagementToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  gitYamlTool: PropTypes.string,
};

ArgoCdStepSourceControlManagementToolSelectInput.defaultProps = {
  fieldName: "gitToolId",
};

export default ArgoCdStepSourceControlManagementToolSelectInput;