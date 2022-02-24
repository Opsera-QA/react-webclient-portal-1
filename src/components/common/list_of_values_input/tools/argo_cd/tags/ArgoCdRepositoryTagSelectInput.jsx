import React from "react";
import PropTypes from "prop-types";
import ArgoCdRepositoryTagSelectInputBase
  from "components/common/list_of_values_input/tools/argo_cd/tags/ArgoCdRepositoryTagSelectInputBase";
import {toolIdentifierConstants} from "components/admin/tools/tool_identifier/toolIdentifier.constants";
import ArgoCdRepositoryAzureTagSelectInput
  from "components/common/list_of_values_input/tools/argo_cd/tags/ArgoCdRepositoryAzureTagSelectInput";

function ArgoCdRepositoryTagSelectInput(
  {
    fieldName,
    model,
    setModel,
    pipelineId,
    stepId,
    plan,
    toolIdentifier,
    disabled,
    setDataFunction,
    clearDataFunction,
    valueField,
    textField,
  }) {

  // TODO: If more are supported, build a switch statement
  if (toolIdentifier === toolIdentifierConstants.TOOL_IDENTIFIERS.AZURE_ACR_PUSH) {
    return (
      <ArgoCdRepositoryAzureTagSelectInput
        fieldName={fieldName}
        plan={plan}
        model={model}
        setModel={setModel}
        setDataFunction={setDataFunction}
        clearDataFunction={clearDataFunction}
        stepId={stepId}
        pipelineId={pipelineId}
        toolIdentifier={toolIdentifier}
        valueField={valueField}
        textField={textField}
        disabled={disabled}
      />
    );
  }

  return (
    <ArgoCdRepositoryTagSelectInputBase
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      stepId={stepId}
      pipelineId={pipelineId}
      toolIdentifier={toolIdentifier}
      valueField={valueField}
      textField={textField}
      disabled={disabled}
    />
  );
}

ArgoCdRepositoryTagSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  stepId: PropTypes.string.isRequired,
  pipelineId: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  valueField: PropTypes.string,
  textField: PropTypes.string,
  toolIdentifier: PropTypes.string,
  plan: PropTypes.array,
};

ArgoCdRepositoryTagSelectInput.defaultProps = {
  valueField: "value",
  textField: "name",
};

export default ArgoCdRepositoryTagSelectInput;
