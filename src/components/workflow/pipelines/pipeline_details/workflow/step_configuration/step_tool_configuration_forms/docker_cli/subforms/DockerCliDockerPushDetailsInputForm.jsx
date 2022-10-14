import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import DockerCliRegistryTypeSelectInput from "../inputs/DockerCliRegistryTypeSelectInput";
import DockerCliAcrDetailsInputForm from "./DockerCliAcrDetailsInputForm";
import DockerCliEcrDetailsInputForm from "./DockerCliEcrDetailsInputForm";
import DockerCliJFrogDetailsInputForm from "./DockerCliJFrogDetailsInputForm";
import DockerCliNexusDetailsInputForm from "./DockerCliNexusDetailsInputForm";

function DockerCliDockerPushDetailsInputForm({ model, setModel, stepId, plan }) {

  const getRegistryInputs = () => {
    if (model?.getData("registryType") == undefined || model?.getData("registryType") === "") {
      return null;
    }
    switch (model?.getData("registryType")) {
      case "acr":
        return (
          <DockerCliAcrDetailsInputForm 
            model={model}
            setModel={setModel}
          />
        );
      case "ecr":
        return (
          <DockerCliEcrDetailsInputForm 
            model={model}
            setModel={setModel}
          />
        );
      case "jfrog":
        return (
          <DockerCliJFrogDetailsInputForm 
            model={model}
            setModel={setModel}
            stepId={stepId}
            plan={plan}
          />
        );
      case "nexus":
        return (
          <DockerCliNexusDetailsInputForm 
            model={model}
            setModel={setModel}
          />
        );
      default:
        return null;
    }    
  };

  const getDynamicFields = () => {
    if (model?.getData("enableDockerPush") === true) {
      return (
        <>
          <DockerCliRegistryTypeSelectInput
            model={model}
            setModel={setModel}
          />
          {getRegistryInputs()}
        </>
      );
    }
  };

  const setDataFunction = (fieldName, value) => {
    let newModel = {...model};
    newModel.setData(fieldName, value);
    newModel.setData("accountPassword", "");
    newModel.setData("secretAccessTokenKey", "");
    newModel.setData("userName", "");
    setModel({...newModel});
  };

  return (
    <>
      <BooleanToggleInput
        fieldName={"enableDockerPush"}
        dataObject={model}
        setDataObject={setModel}
        setDataFunction={setDataFunction}
      />      
      {getDynamicFields()}
    </>
  );
}

DockerCliDockerPushDetailsInputForm.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  stepId: PropTypes.string,
  plan: PropTypes.array,
};

export default DockerCliDockerPushDetailsInputForm;
