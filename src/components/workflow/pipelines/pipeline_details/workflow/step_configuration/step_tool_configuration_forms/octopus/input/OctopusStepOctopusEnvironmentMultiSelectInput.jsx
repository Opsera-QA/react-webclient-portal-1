import React from "react";
import PropTypes from "prop-types";
import OctopusEnvironmentMultiSelectInput
  from "components/common/list_of_values_input/tools/octopus/environments/OctopusEnvironmentMultiSelectInput";

function OctopusStepOctopusEnvironmentMultiSelectInput({ fieldName, model, setModel, disabled}) {
  const formatDataFunction = (environments) => {
    return environments?.map((environment) => {
      return {
        environmentName: environment.name,
        environmentId: environment.id,
      };
    });
  };

  return (
    <OctopusEnvironmentMultiSelectInput
      octopusToolId={model?.getData("octopusToolId")}
      spaceId={model?.getData("spaceId")}
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      valueField={"environmentId"}
      textField={"environmentName"}
      disabled={disabled}
      formatDataFunction={formatDataFunction}
    />
  );
}

OctopusStepOctopusEnvironmentMultiSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  octopusToolId: PropTypes.string,
  spaceId: PropTypes.string,
  formattedDataFunction: PropTypes.func,
};

export default OctopusStepOctopusEnvironmentMultiSelectInput;