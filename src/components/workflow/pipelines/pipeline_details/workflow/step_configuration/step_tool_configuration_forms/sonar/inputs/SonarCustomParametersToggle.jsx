import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import CommandLineParameterSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/command_line/inputs/CommandLineParameterSelectInput";

function SonarCustomParametersToggle({model, setModel, fieldName, disabled}) {

  const setDataFunction = () => {
    let newDataObject = model;
    newDataObject.setData("saveSonarParameters", !model.getData("saveSonarParameters"));
    newDataObject.setData("sonarCustomParameters", []);
    setModel({...newDataObject});
  };

  const getParametersInput = () => {
    if (model?.getData("saveSonarParameters") === true) {
      return (
        <CommandLineParameterSelectInput
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

SonarCustomParametersToggle.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
  setModel: PropTypes.func,
  disabled: PropTypes.bool
};

SonarCustomParametersToggle.defaultProps = {
  fieldName: "saveSonarParameters"
};

export default SonarCustomParametersToggle;