import React, {useState} from "react";
import PropTypes from "prop-types";
import OctopusEnvironmentMultiSelectInput
  from "components/common/list_of_values_input/tools/octopus/environments/OctopusEnvironmentMultiSelectInput";
import InfoText from "components/common/inputs/info_text/InfoText";

function OctopusStepOctopusEnvironmentMultiSelectInput({ fieldName, model, setModel, disabled}) {
  const [errorMessage, setErrorMessage] = useState("");

  const setDataFunction = async (fieldName, newArray) => {
    const newModel = {...model};
    const mappedArray = newArray?.map((environment) => {
      return {
        name: environment.name,
        id: environment.id,
      };
    });

    if (mappedArray.length > model.getMaxItems(fieldName)) {
      setErrorMessage(`
        You have reached the maximum allowed number of Environment Configurations. 
        Please remove one, if you would like to add another. 
      `);
      return;
    }
    else {
      setErrorMessage("");
    }

    // Environments removed need to also remove related tenants with that environment
    const tenantList = newModel?.getArrayData("tenantList");

    if (Array.isArray(tenantList) && tenantList?.length > 0) {
      const newTenantList = tenantList.filter((tenant) => {
        const environmentId = tenant?.environmentId;
        const foundEnvironment = mappedArray.find((environment) => {return environment.id === environmentId;});
        return foundEnvironment != null;
      });

      newModel.setData("tenantList", newTenantList);
    }

    newModel.setData(fieldName, mappedArray);
    setModel({ ...newModel });
  };

  const clearDataFunction = () => {
    const newModel = {...model};
    newModel.setDefaultValue(fieldName);
    setModel({...newModel});
  };

  return (
    <>
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
      <InfoText errorMessage={errorMessage} />
    </>
  );
}

OctopusStepOctopusEnvironmentMultiSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default OctopusStepOctopusEnvironmentMultiSelectInput;