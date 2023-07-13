import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const MIGRATION_TYPES = [
  {
    text: "Git2Git",
    value: "git_2_git",
  },
];

const ScmToScmMigrationTaskMigrationTypeSelectInput = ({
  model,
  setModel,
  fieldName,
  disabled,
}) => {
  return (
    <SelectInputBase
      dataObject={model}
      setDataObject={setModel}
      textField={"text"}
      valueField={"value"}
      selectOptions={MIGRATION_TYPES}
      fieldName={fieldName}
      disabled={disabled}
    />
  );
};

ScmToScmMigrationTaskMigrationTypeSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
};

export default ScmToScmMigrationTaskMigrationTypeSelectInput;
