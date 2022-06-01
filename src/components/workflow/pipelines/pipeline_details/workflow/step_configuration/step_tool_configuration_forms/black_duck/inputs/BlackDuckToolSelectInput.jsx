import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedBlackDuckToolSelectInput
  from "components/common/list_of_values_input/tools/black_duck/RoleRestrictedBlackDuckToolSelectInput";

function BlackDuckToolSelectInput({ model, setModel, className, disabled }) {

  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData(fieldName, selectedOption._id);
    newModel.setDefaultValue("projectName");
    setModel({...newModel});
  };

  const clearDataFunction = (fieldName) => {
    let newModel = {...model};
    newModel.setDefaultValue("blackDuckToolId");
    newModel.setDefaultValue("projectName");    
    setModel({...newModel});
  };

  return (
    <RoleRestrictedBlackDuckToolSelectInput
      fieldName={"blackDuckToolId"}
      className={className}
      model={model}
      setModel={setModel}
      disabled={disabled}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
    />
  );
}

BlackDuckToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default BlackDuckToolSelectInput;
