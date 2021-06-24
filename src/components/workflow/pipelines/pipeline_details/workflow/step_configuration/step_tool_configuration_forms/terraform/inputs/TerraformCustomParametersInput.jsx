import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import TerraformParameterSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformParameterSelectInput";

function TerraformCustomParametersToggle({model, setModel, fieldName, disabled}) {

  const setDataFunction = () => {
    let newDataObject = model;
    newDataObject.setData("saveParameters", !model.getData("saveParameters"));
    newDataObject.setData("customParameters", []);
    setModel({...newDataObject});
  };

  const getParametersInput = () => {
    if (model?.getData("saveParameters") === true) {
      return (
        <TerraformParameterSelectInput
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

TerraformCustomParametersToggle.defaultProps = {
  fieldName: "saveParameters"
};

export default TerraformCustomParametersToggle;