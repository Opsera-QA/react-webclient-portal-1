import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import TerraformParameterSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformParameterSelectInput";
import TerraformInputParameters from "./TerraformInputParameters";

function TerraformCustomParametersToggle({model, setModel, fieldName, disabled}) {

  const setDataFunction = () => {
    let newDataObject = model;
    newDataObject.setData(fieldName, !model.getData(fieldName));
    if (fieldName === "saveParameters") newDataObject.setData("customParameters", []);
    if (fieldName === "saveInputParameters") newDataObject.setData("inputParameters", []);
    setModel({...newDataObject});
  };

  const getParametersInput = () => {
    if (model?.getData("saveParameters") === true && fieldName === "saveParameters") {
      return (
        <TerraformParameterSelectInput
          dataObject={model}
          setDataObject={setModel}
          disabled={disabled}
        />
      );
    }
    if (model?.getData("saveInputParameters") === true && fieldName === "saveInputParameters") {
      return (
        <TerraformInputParameters
          dataObject={model}
          setDataObject={setModel}
          disabled={disabled}
        />
      );
    }
  };

  if (model == null) {
    return null;
  }

  return (
    <>
      <BooleanToggleInput
        setDataObject={setModel}
        dataObject={model}
        setDataFunction={setDataFunction}
        fieldName={fieldName}
        disabled={disabled}
      />
      {getParametersInput()}
    </>
  );
}

TerraformCustomParametersToggle.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
  setModel: PropTypes.func,
  disabled: PropTypes.bool
};

export default TerraformCustomParametersToggle;