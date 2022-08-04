import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedLiquibaseToolSelectInput
  from "components/common/list_of_values_input/tools/liquibase/RoleRestrictedLiquibaseToolSelectInput";

function LiquibaseToolSelectInput({ model, setModel, className, disabled }) {

  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData(fieldName, selectedOption._id);    
    setModel({...newModel});
  };

  const clearDataFunction = (fieldName) => {
    let newModel = {...model};
    newModel.setDefaultValue("toolConfigId");    
    setModel({...newModel});
  };

  return (
    <RoleRestrictedLiquibaseToolSelectInput
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

LiquibaseToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default LiquibaseToolSelectInput;
