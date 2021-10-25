import React from 'react';
import PropTypes from 'prop-types';
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const SCM_TOOL_IDENTIFIERS = [
  {
    text: "Gitlab",
    value: "gitlab",
  },
  {
    text: "Github",
    value: "github",
  },
  {
    text: "Bitbucket",
    value: "bitbucket",
  },
];

function ScmToolIdentifierSelectInput({model, setModel, fieldName, disabled, setDataFunction, clearDataFunction}) {
  return (
    <SelectInputBase
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      textField={"text"}
      valueField={"value"}
      dataObject={model}
      clearDataFunction={clearDataFunction}
      selectOptions={SCM_TOOL_IDENTIFIERS}
      fieldName={fieldName}
      disabled={disabled}
    />
  );
}

ScmToolIdentifierSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
};

export default ScmToolIdentifierSelectInput;