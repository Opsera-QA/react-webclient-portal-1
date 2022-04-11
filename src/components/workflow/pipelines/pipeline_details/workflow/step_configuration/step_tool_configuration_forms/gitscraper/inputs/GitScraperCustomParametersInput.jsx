import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import GitScraperParameterSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/GitScraperParameterSelectInput";
import GitScraperInputParameters from "./GitScraperInputParameters";
import GitScraperEnvironmentVariables from "./custom_scripts/GitScraperEnvironmentVariables";

function GitScraperCustomParametersToggle({model, setModel, fieldName, disabled}) {

  const setDataFunction = () => {
    let newDataObject = model;
    newDataObject.setData(fieldName, !model.getData(fieldName));
    if (fieldName === "saveParameters") newDataObject.setData("customParameters", []);
    if (fieldName === "saveInputParameters") newDataObject.setData("inputParameters", []);
    if (fieldName === "saveEnvironmentVariables") newDataObject.setData("environmentVariables", []);
    setModel({...newDataObject});
  };

  const getParametersInput = () => {
    if (model?.getData("saveParameters") === true && fieldName === "saveParameters") {
      return (
        <GitScraperParameterSelectInput
          dataObject={model}
          setDataObject={setModel}
          disabled={disabled}
        />
      );
    }
    if (model?.getData("saveInputParameters") === true && fieldName === "saveInputParameters") {
      return (
        <GitScraperInputParameters
          dataObject={model}
          setDataObject={setModel}
          disabled={disabled}
        />
      );
    }
    if (model?.getData("saveEnvironmentVariables") === true && fieldName === "saveEnvironmentVariables") {
      return (
        <GitScraperEnvironmentVariables
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

  if (model?.getData("customScript") && fieldName === "saveInputParameters") {
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

GitScraperCustomParametersToggle.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
  setModel: PropTypes.func,
  disabled: PropTypes.bool
};

export default GitScraperCustomParametersToggle;