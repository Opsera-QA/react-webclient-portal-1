import React from 'react';
import PropTypes from 'prop-types';
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {toolIdentifierConstants} from "components/admin/tools/identifiers/toolIdentifier.constants";

export const GIT_SOURCE_CONTROL_MANAGEMENT_TOOL_IDENTIFIERS = [
  {
    text: "Gitlab",
    value: toolIdentifierConstants.TOOL_IDENTIFIERS.GITLAB,
  },
  {
    text: "Github",
    value: toolIdentifierConstants.TOOL_IDENTIFIERS.GITHUB,
  },
  {
    text: "Bitbucket",
    value: toolIdentifierConstants.TOOL_IDENTIFIERS.BITBUCKET,
  },
];

function GitBranchSourceControlManagementToolIdentifierSelectInput(
  {
    model,
    setModel,
    fieldName,
    disabled,
    setDataFunction,
    clearDataFunction,
  }) {
  return (
    <SelectInputBase
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      textField={"text"}
      valueField={"value"}
      dataObject={model}
      clearDataFunction={clearDataFunction}
      selectOptions={GIT_SOURCE_CONTROL_MANAGEMENT_TOOL_IDENTIFIERS}
      fieldName={fieldName}
      disabled={disabled}
    />
  );
}

GitBranchSourceControlManagementToolIdentifierSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
};

export default GitBranchSourceControlManagementToolIdentifierSelectInput;