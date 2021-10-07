import React from "react";
import PropTypes from "prop-types";
import OctopusEnvironmentMultiSelectInput
  from "components/common/list_of_values_input/tools/octopus/environments/OctopusEnvironmentMultiSelectInput";

function OctopusStepOctopusEnvironmentMultiSelectInput({ fieldName, model, setModel, disabled}) {
  const setDataFunction = async (fieldName, newArray) => {
    const newModel = {...model};

    const mappedArray = newArray?.map((environment) => {
      return {
        name: environment.name,
        id: environment.id,
      };
    });

    newModel.setData(fieldName, mappedArray);
    setModel({ ...newModel });
  };

  const clearDataFunction = () => {
    const newModel = {...model};
    newModel.setDefaultValue(fieldName);
    setModel({...newModel});
  };

  return (
    <OctopusEnvironmentMultiSelectInput
      octopusToolId={model?.getData("octopusToolId")}
      spaceId={model?.getData("spaceId")}
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      valueField={"id"}
      textField={"name"}
      disabled={disabled}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
    />
  );
}

OctopusStepOctopusEnvironmentMultiSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default OctopusStepOctopusEnvironmentMultiSelectInput;