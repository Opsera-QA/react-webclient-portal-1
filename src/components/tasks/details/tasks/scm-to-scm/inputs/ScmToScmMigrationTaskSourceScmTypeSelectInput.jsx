import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const SOURCE_SCM_TYPES = [
  {
    text: "Github",
    value: "github",
  },
  {
    text: "GitLab",
    value: "gitlab",
  },
  {
    text: "BitBucket",
    value: "bitbucket",
  },
];

const ScmToScmMigrationTaskSourceScmTypeSelectInput = ({
  model,
  setModel,
  fieldName,
  disabled,
}) => {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = { ...model };
    newModel.setData("sourceScmType", selectedOption?.value);
    newModel.setDefaultValue("sourceGitToolId");
    newModel.setDefaultValue("sourceWorkspace");
    newModel.setDefaultValue("repositoryMapList");
    setModel({ ...newModel });
  };

  const clearDataFunction = () => {
    let newModel = { ...model };
    newModel.setDefaultValue("sourceScmType");
    newModel.setDefaultValue("sourceGitToolId");
    newModel.setDefaultValue("sourceWorkspace");
    newModel.setDefaultValue("repositoryMapList");
    setModel({ ...newModel });
  };
  return (
    <SelectInputBase
      dataObject={model}
      setDataObject={setModel}
      textField={"text"}
      valueField={"value"}
      selectOptions={SOURCE_SCM_TYPES}
      fieldName={"sourceScmType"}
      disabled={disabled}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
    />
  );
};

ScmToScmMigrationTaskSourceScmTypeSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
};

export default ScmToScmMigrationTaskSourceScmTypeSelectInput;
