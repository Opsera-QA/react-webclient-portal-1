import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const SOURCE_REPOSITORY_TOOLS = [
  { value: "gitlab", text: "GitLab" },
  { value: "github", text: "GitHub" },
  { value: "bitbucket", text: "Bitbucket" },
];

function SourceRepositoryToolIdentifierSelectInput({ fieldName, model, setModel, setDataFunction, clearDataFunction, disabled }) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={SOURCE_REPOSITORY_TOOLS}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      valueField="value"
      textField="text"
      disabled={disabled}
    />
  );
}

SourceRepositoryToolIdentifierSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SourceRepositoryToolIdentifierSelectInput;