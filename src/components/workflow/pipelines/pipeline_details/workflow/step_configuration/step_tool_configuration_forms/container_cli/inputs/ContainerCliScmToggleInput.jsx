import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function ContainerCliScmToggleInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
  }) {
  const setDataFunction = (fieldName, value) => {
    const newModel = {...model};
    newModel.setData(fieldName, value);
    newModel.setDefaultValue("type");
    newModel.setDefaultValue("gitRepository");
    newModel.setDefaultValue("defaultBranch");
    newModel.setDefaultValue("gitToolId");
    newModel.setDefaultValue("gitRepositoryID");
    newModel.setDefaultValue("sshUrl");
    newModel.setDefaultValue("gitUrl");
    newModel.setDefaultValue("bitbucketWorkspace");
    newModel.setDefaultValue("bitbucketWorkspaceName");
    setModel({...newModel});
  };

  return (
    <BooleanToggleInput
      setDataObject={setModel}
      dataObject={model}
      fieldName={fieldName}
      disabled={disabled}
      setDataFunction={setDataFunction}
    />
  );
}

ContainerCliScmToggleInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

ContainerCliScmToggleInput.defaultProps = {
  fieldName: "useScm",
};

export default ContainerCliScmToggleInput;
