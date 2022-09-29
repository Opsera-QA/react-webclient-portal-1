import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function BoomiMigrationScmDetailsToggleInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
  }) {
  const setDataFunction = (fieldName, value) => {
    const newModel = {...model};
    newModel.setData(fieldName, value);
    newModel.setDefaultValue("gitToolId");
    newModel.setDefaultValue("repoId");
    newModel.setDefaultValue("service");
    newModel.setDefaultValue("gitUrl");
    newModel.setDefaultValue("sshUrl");
    newModel.setDefaultValue("repository");
    newModel.setDefaultValue("workspace");
    newModel.setDefaultValue("workspaceName");
    newModel.setDefaultValue("gitBranch");
    newModel.setDefaultValue("filePath");
    newModel.setDefaultValue("fileName");
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

BoomiMigrationScmDetailsToggleInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

BoomiMigrationScmDetailsToggleInput.defaultProps = {
  fieldName: "fetchComponentsFromGit",
};

export default BoomiMigrationScmDetailsToggleInput;
