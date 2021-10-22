import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase
  from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";

function JenkinsAccountToolSelectInput({ visible, model, setModel, disabled, fieldName }) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = { ...model };
    newModel.setData(fieldName, selectedOption?._id || "");
    newModel.setData("credentailsToolId", selectedOption?._id || "");
    newModel.setData("gitCredential", "");
    newModel.setData("gitUserName", selectedOption?.configuration?.accountUsername || "");
    newModel.setData("accountUserName", selectedOption?.configuration?.accountUsername || "");
    setModel({ ...newModel });
  };

  const clearDataFunction = () => {
    let newModel = { ...model };
    newModel.setData(fieldName, "");
    newModel.setData("credentailsToolId", "");
    newModel.setData("gitCredential", "");
    newModel.setData("gitUserName", "");
    newModel.setData("accountUserName", "");
    setModel({ ...newModel });
  };

  return (
    <RoleRestrictedToolByIdentifierInputBase
      toolIdentifier={model?.getData("service")}
      toolFriendlyName={"Tool"}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      visible={visible}
      disabled={disabled || model?.getData("service") === ""}
    />
  );
}

JenkinsAccountToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
  visible: PropTypes.bool,
};

JenkinsAccountToolSelectInput.defaultProps = {
  visible: true,
  fieldName: "toolId",
};

export default JenkinsAccountToolSelectInput;
