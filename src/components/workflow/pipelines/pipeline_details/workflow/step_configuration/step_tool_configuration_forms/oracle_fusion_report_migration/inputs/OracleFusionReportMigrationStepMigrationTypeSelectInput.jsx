import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const MIGRATION_TYPES = [
  {
    name: "Instance To Instance",
    value: "instance_to_instance",
  },
  {
    name: "Artifactory To Instance",
    value: "artifactory_to_instance",
  },
];

function OracleFusionReportMigrationStepMigrationTypeSelectInput({model, setModel, isLoading, disabled}) {
  
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("migrationType", selectedOption?.value);
    newModel.setDefaultValue("sourceInstanceToolId");
    newModel.setDefaultValue("sourceInstancePath");
    newModel.setDefaultValue("sourceInstanceReports");
    newModel.setDefaultValue("artifactStepId");
    setModel({...newModel});
  };

  return (
     <SelectInputBase
       fieldName={"migrationType"}
       dataObject={model}
       setDataObject={setModel}
       selectOptions={MIGRATION_TYPES}
       valueField={"value"}
       textField={"name"}
       placeholderText={"Select a Migration Type"}
       setDataFunction={setDataFunction}
       disabled={disabled}
       busy={isLoading}
     />
  );
}

OracleFusionReportMigrationStepMigrationTypeSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default OracleFusionReportMigrationStepMigrationTypeSelectInput;
