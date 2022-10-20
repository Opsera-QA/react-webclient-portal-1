import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedFortifyToolSelectInput
  from "components/common/list_of_values_input/tools/fortify/RoleRestrictedFortifyToolSelectInput";

function FortifyToolSelectInput({ model, setModel, className, disabled }) {

  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData(fieldName, selectedOption._id);
    newModel.setDefaultValue("applicationId");
    newModel.setDefaultValue("releaseId");
    setModel({...newModel});
  };

  const clearDataFunction = (fieldName) => {
    let newModel = {...model};
    newModel.setDefaultValue("toolConfigId");
    newModel.setDefaultValue("applicationId");
    newModel.setDefaultValue("releaseId");
    setModel({...newModel});
  };

  return (
    <RoleRestrictedFortifyToolSelectInput
      fieldName={"toolConfigId"}
      className={className}
      model={model}
      setModel={setModel}
      disabled={disabled}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
    />
  );
}

FortifyToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default FortifyToolSelectInput;
