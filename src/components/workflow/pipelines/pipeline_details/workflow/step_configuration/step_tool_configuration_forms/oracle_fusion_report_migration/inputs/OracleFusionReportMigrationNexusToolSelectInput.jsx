import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedNexusToolSelectInput
  from "components/common/list_of_values_input/tools/nexus/RoleRestrictedNexusToolSelectInput";

const OracleFusionReportMigrationNexusToolSelectInput = ({model, setModel, disabled, fieldName}) => {
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = model;
    newDataObject.setData(fieldName, selectedOption._id);
    newDataObject.setDefaultValue("repositoryName");
    newDataObject.setDefaultValue("groupName");
    setModel({...newDataObject});
  };

  const clearDataFunction = () => {
    let newDataObject = {...model};
    newDataObject.setDefaultValue(fieldName);
    newDataObject.setDefaultValue("repositoryName");
    newDataObject.setDefaultValue("groupName");
    setModel({...newDataObject});
  };

  return (
    <RoleRestrictedNexusToolSelectInput
      model={model}
      setModel={setModel}
      fieldName={fieldName}
      disabled={disabled}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
    />
  );
};

OracleFusionReportMigrationNexusToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  getToolsList: PropTypes.func,
  fieldName: PropTypes.string,
};

OracleFusionReportMigrationNexusToolSelectInput.defaultProps = {
  fieldName: "nexusToolConfigId",
};

export default OracleFusionReportMigrationNexusToolSelectInput;
