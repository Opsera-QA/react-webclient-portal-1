import React from "react";
import PropTypes from "prop-types";
import RepositorySelectInput from "components/common/list_of_values_input/tools/repositories/RepositorySelectInput";

function ProjectRepositorySelectInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
    textField,
    valueField,
  }) {
  return (
    <RepositorySelectInput
      workspace={model?.getData("tool_prop")}
      gitToolId={model?.getData("tool_id")}
      service={model?.getData("tool_identifier")}
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      valueField={valueField}
      textField={textField}
      disabled={disabled}
    />
  );
}

ProjectRepositorySelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
};

ProjectRepositorySelectInput.defaultProps = {
  fieldName: "key",
  valueField: "name",
  textField: "name"
};

export default ProjectRepositorySelectInput;