import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import CommandLineDependencyTypeInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/command_line/inputs/CommandLineDependencyTypeInput";
import EditableParameterMappingInput from "components/common/list_of_values_input/parameters/mapping/EditableParameterMappingInput";
import DockerCliCommandLineInputParameterInput from "../inputs/DockerCliCommandLineInputParameterInput";
import DockerCliOutputVariableCommandLineInputParameterInput from "../inputs/DockerCliOutputVariableCommandLineInputParameterInput";



function DockerCliOutputVariablesInputForm({ model, setModel, plan }) {

  const getDynamicFields = () => {
    if (model?.getData("enableOutputVariables") === true) {
      return (
        <DockerCliOutputVariableCommandLineInputParameterInput model={model} setModel={setModel} plan={plan} fieldName={"outputVariables"} subheaderText={"Output Variables"} />
      );
    }
  };

  return (
    <>
      <BooleanToggleInput
        fieldName={"enableOutputVariables"}
        dataObject={model}
        setDataObject={setModel}
      />
      {getDynamicFields()}
    </>
  );
}

DockerCliOutputVariablesInputForm.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  plan: PropTypes.array,
};

export default DockerCliOutputVariablesInputForm;
