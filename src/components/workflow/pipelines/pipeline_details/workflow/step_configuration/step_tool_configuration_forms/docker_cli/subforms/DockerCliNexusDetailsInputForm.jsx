import React from "react";
import PropTypes from "prop-types";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import RoleRestrictedNexusToolSelectInput
  from "components/common/list_of_values_input/tools/nexus/RoleRestrictedNexusToolSelectInput";
import DockerCliNexusRepoSelectInput from "../inputs/DockerCliNexusRepoSelectInput";

function DockerCliNexusDetailsInputForm({ model, setModel }) {

  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = { ...model };
    newModel.setData(fieldName, selectedOption._id);
    newModel.setDefaultValue("repositoryGroup");
    newModel.setDefaultValue("repositoryName");
    newModel.setDefaultValue("dockerPort");
    setModel({ ...newModel });
  };

  const clearDataFunction = () => {
    let newModel = { ...model };
    newModel.setDefaultValue("nexusToolConfigId");
    newModel.setDefaultValue("repositoryGroup");
    newModel.setDefaultValue("repositoryName");
    newModel.setDefaultValue("dockerPort");
    setModel({ ...newModel });
  };

  return (
    <>
      <RoleRestrictedNexusToolSelectInput
        model={model}
        setModel={setModel}
        fieldName={"nexusToolConfigId"}
        setDataFunction={setDataFunction}
        clearDataFunction={clearDataFunction}      
      />
      <DockerCliNexusRepoSelectInput
        model={model}
        setModel={setModel}
        nexusToolConfigId={model.getData("nexusToolConfigId")}
      />
      <TextInputBase
        setDataObject={setModel}
        dataObject={model}
        fieldName={"dockerPort"}
        key="dockerPort"
      />
    </>    
  );
}

DockerCliNexusDetailsInputForm.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
};

export default DockerCliNexusDetailsInputForm;
