import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import CommandLineDependencyTypeInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/command_line/inputs/CommandLineDependencyTypeInput";
import EditableParameterMappingInput from "components/common/list_of_values_input/parameters/mapping/EditableParameterMappingInput";
import DockerCliCommandLineInputParameterInput from "../inputs/DockerCliCommandLineInputParameterInput";
import PipelineStepParameterInputBase
  from "components/common/list_of_values_input/parameters/pipeline/PipelineStepParameterInputBase";

function DockerCliDependenciesInputForm({ model, setModel, plan }) {

  const getDynamicFields = () => {
    if (model?.getData("enableDependency") === true) {
      return (
        <>
          <CommandLineDependencyTypeInput 
            dataObject={model} 
            setDataObject={setModel} 
          />
          <TextAreaInput 
            dataObject={model} 
            setDataObject={setModel}
            fieldName={"commands"}        
          />
          <EditableParameterMappingInput
            model={model}
            setModel={setModel}
            fieldName={"environmentVariables"}
            nameMaxLength={50}
          />
          <PipelineStepParameterInputBase
            saveEnvironmentVariables={true}
            environmentVariablesFieldName={"environmentVariables"}
            model={model}
            setModel={setModel}
            plan={plan}
            allowTerraformParametersSync={true}
            allowParameterMapping={true}
          />
        </>
      );
    }
  };

  const setDataFunction = (fieldName, value) => {
    let newModel = {...model};
    newModel.setData(fieldName, value);
    setModel({...newModel});
  };

  return (
    <>
      <BooleanToggleInput
        fieldName={"enableDependency"}
        dataObject={model}
        setDataObject={setModel}
        setDataFunction={setDataFunction}
      />
      {getDynamicFields()}
    </>
  );
}

DockerCliDependenciesInputForm.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  plan: PropTypes.array,
};

export default DockerCliDependenciesInputForm;
