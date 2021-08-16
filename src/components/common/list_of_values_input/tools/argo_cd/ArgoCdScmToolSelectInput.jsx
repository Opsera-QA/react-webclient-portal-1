import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolInputBase from "components/common/list_of_values_input/tools/RoleRestrictedToolInputBase";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";

function ArgoCdScmToolSelectInput({className, fieldName, model, setModel, disabled, gitYamlTool}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("gitToolId", selectedOption?._id);
    setModel({...newModel});
  };

  return (
    <RoleRestrictedToolInputBase
      toolType={gitYamlTool}
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

ArgoCdScmToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  gitYamlTool: PropTypes.string,
};

ArgoCdScmToolSelectInput.defaultProps = {
  fieldName: "gitToolId",
};

export default ArgoCdScmToolSelectInput;