import React from "react";
import PropTypes from "prop-types";
import RepositorySelectInput from "components/common/list_of_values_input/tools/repositories/RepositorySelectInput";

export default function ProjectDataMappingGithubRepositorySelectInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
    textField,
  }) {
  return (
    <RepositorySelectInput
      workspace={model?.getData("tool_prop")}
      gitToolId={model?.getData("tool_id")}
      service={model?.getData("tool_identifier")}
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      valueField={"name"}
      textField={textField}
      disabled={disabled}
    />
  );
}

ProjectDataMappingGithubRepositorySelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
};

ProjectDataMappingGithubRepositorySelectInput.defaultProps = {
  fieldName: "key",
};
