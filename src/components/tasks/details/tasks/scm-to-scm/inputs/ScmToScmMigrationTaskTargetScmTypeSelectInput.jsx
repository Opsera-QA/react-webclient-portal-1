import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const TARGET_SCM_TYPES = [
  {
    text: "Github",
    value: "github",
  },
  // {
  //   text: "GitLab",
  //   value: "gitlab",
  // },
  // {
  //   text: "BitBucket",
  //   value: "bitbucket",
  // },
];

const ScmToScmMigrationTaskTargetScmTypeSelectInput = ({
  model,
  setModel,
  fieldName,
  disabled,
}) => {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = { ...model };
    newModel.setData("targetScmType", selectedOption?.value);
    newModel.setDefaultValue("targetGitToolId");

    setModel({ ...newModel });
  };

  const clearDataFunction = () => {
    let newModel = { ...model };
    newModel.setDefaultValue("targetScmType");
    newModel.setDefaultValue("targetGitToolId");

    setModel({ ...newModel });
  };

  return (
    <SelectInputBase
      dataObject={model}
      setDataObject={setModel}
      textField={"text"}
      valueField={"value"}
      selectOptions={TARGET_SCM_TYPES}
      fieldName={fieldName}
      disabled={disabled}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
    />
  );
};

ScmToScmMigrationTaskTargetScmTypeSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
};

export default ScmToScmMigrationTaskTargetScmTypeSelectInput;
