import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedOracleFusionToolSelectInput
  from "components/common/list_of_values_input/tools/oracle_fusion/RoleRestrictedOracleFusionToolSelectInput";

function OracleFusionReportMigrationSourceToolSelectInput({ model, setModel, className, disabled }) {

  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData(fieldName, selectedOption._id);
    newModel.setDefaultValue("sourceInstanceReports");
    setModel({...newModel});
  };

  const clearDataFunction = (fieldName) => {
    let newModel = {...model};
    newModel.setDefaultValue("sourceInstanceToolId");
    newModel.setDefaultValue("sourceInstanceReports");
    setModel({...newModel});
  };

  return (
    <RoleRestrictedOracleFusionToolSelectInput
      fieldName={"sourceInstanceToolId"}
      className={className}
      model={model}
      setModel={setModel}
      disabled={disabled}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
    />
  );
}

OracleFusionReportMigrationSourceToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default OracleFusionReportMigrationSourceToolSelectInput;
