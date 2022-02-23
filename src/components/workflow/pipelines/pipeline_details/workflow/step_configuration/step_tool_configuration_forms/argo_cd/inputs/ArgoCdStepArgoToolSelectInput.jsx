import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedArgoToolSelectInput
  from "components/common/list_of_values_input/tools/argo_cd/tools/RoleRestrictedArgoToolSelectInput";

function ArgoCdStepArgoToolSelectInput(
  {
    className,
    fieldName,
    model,
    setModel,
    disabled,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("toolConfigId", selectedOption?._id);
    newModel.setData("toolUrl", selectedOption?.configuration?.toolURL);
    newModel.setData("userName", selectedOption?.configuration?.userName);
    setModel({...newModel});
  };

  return (
    <RoleRestrictedArgoToolSelectInput
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      disabled={disabled}
      className={className}
    />
  );
}

ArgoCdStepArgoToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  fieldName: PropTypes.string
};

ArgoCdStepArgoToolSelectInput.defaultProps = {
  fieldName: "toolConfigId",
};

export default ArgoCdStepArgoToolSelectInput;