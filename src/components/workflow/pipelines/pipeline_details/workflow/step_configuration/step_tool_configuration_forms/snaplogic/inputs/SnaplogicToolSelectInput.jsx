import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedSnaplogicToolSelectInput
  from "components/common/list_of_values_input/tools/snaplogic/RoleRestrictedSnaplogicToolSelectInput";

function SnaplogicToolSelectInput({ model, setModel, className, disabled }) {

  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData(fieldName, selectedOption._id);
    newModel.setData("projectSpace", "");
    newModel.setData("project", "");
    setModel({...newModel});
  };

  const clearDataFunction = (fieldName) => {
    let newModel = {...model};
    newModel.setData("toolConfigId", "");
    newModel.setData("projectSpace", "");
    newModel.setData("project", "");
    setModel({...newModel});
  };

  return (
    <RoleRestrictedSnaplogicToolSelectInput
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

SnaplogicToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default SnaplogicToolSelectInput;
