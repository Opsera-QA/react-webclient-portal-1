import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedOracleFusionToolSelectInput
  from "components/common/list_of_values_input/tools/oracle_fusion/RoleRestrictedOracleFusionToolSelectInput";

function OracleFusionReportMigrationTargetToolSelectInput({ model, setModel, className, disabled }) {

  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData(fieldName, selectedOption._id);
    setModel({...newModel});
  };

  const clearDataFunction = (fieldName) => {
    let newModel = {...model};
    newModel.setDefaultValue("targetInstanceToolId");
    setModel({...newModel});
  };

  return (
    <RoleRestrictedOracleFusionToolSelectInput
      fieldName={"targetInstanceToolId"}
      className={className}
      model={model}
      setModel={setModel}
      disabled={disabled}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
    />
  );
}

OracleFusionReportMigrationTargetToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default OracleFusionReportMigrationTargetToolSelectInput;
