import React from "react";
import PropTypes from "prop-types";
import RepositorySelectInput from "components/common/list_of_values_input/tools/repositories/RepositorySelectInput";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

const parseKeyFromFullPath = (keyPath) => {
  const parsedKeyPath = DataParsingHelper.parseString(keyPath, "");
  const splitPath = parsedKeyPath.split('/');
  return splitPath[splitPath.length - 1];
};

export default function ProjectDataMappingGitlabRepositorySelectInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
    textField,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    model.setData('key', parseKeyFromFullPath(selectedOption?.nameSpacedPath));
    model.setData('keyPath', selectedOption?.nameSpacedPath);
    setModel({ ...model });
  };

  return (
    <RepositorySelectInput
      workspace={model?.getData("tool_prop")}
      gitToolId={model?.getData("tool_id")}
      service={model?.getData("tool_identifier")}
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      valueField={"nameSpacedPath"}
      textField={textField}
      disabled={disabled}
    />
  );
}

ProjectDataMappingGitlabRepositorySelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
};

ProjectDataMappingGitlabRepositorySelectInput.defaultProps = {
  fieldName: "keyPath",
};
