import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import DockerCliOutputVariableCommandLineInputParameterInput from "../inputs/DockerCliOutputVariableCommandLineInputParameterInput";



function DockerCliOutputVariablesInputForm({ model, setModel, plan }) {

  const getDynamicFields = () => {
    if (model?.getData("enableOutputVariables") === true) {
      return (
        <DockerCliOutputVariableCommandLineInputParameterInput 
          model={model} 
          setModel={setModel} 
          plan={plan} 
          fieldName={"outputCustomParameters"} 
          subheaderText={"Output Variables"} 
        />
      );
    }
  };
console.log(model);
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
