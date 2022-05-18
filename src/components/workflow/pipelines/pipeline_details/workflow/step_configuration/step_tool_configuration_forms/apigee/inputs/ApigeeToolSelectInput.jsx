import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedApigeeToolSelectInput from "components/common/list_of_values_input/tools/apigee/RoleRestrictedApigeeToolSelectInput";

function ApigeeToolSelectInput(
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
    newModel.setDefaultValue("includeDependantKvm");
    newModel.setDefaultValue("exportStepId");
    newModel.setDefaultValue("targetEnvironment");
    newModel.setDefaultValue("delayTime");
    newModel.setDefaultValue("overrideVersion");    
    setModel({...newModel});
  };

  return (
    <RoleRestrictedApigeeToolSelectInput
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      disabled={disabled}
      className={className}
    />
  );
}

ApigeeToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  fieldName: PropTypes.string
};

ApigeeToolSelectInput.defaultProps = {
  fieldName: "toolConfigId",
};

export default ApigeeToolSelectInput;
