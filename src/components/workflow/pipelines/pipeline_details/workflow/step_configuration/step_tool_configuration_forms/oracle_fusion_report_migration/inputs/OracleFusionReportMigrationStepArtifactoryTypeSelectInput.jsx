import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const ARTIFACTORY_TYPES = [
  {
    name: "Nexus",
    value: "nexus",
  },
];

function OracleFusionReportMigrationStepArtifactoryTypeSelectInput({model, setModel, isLoading, disabled}) {
  
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("artifactoryType", selectedOption?.value);
    newModel.setDefaultValue("nexusToolConfigId");
    newModel.setDefaultValue("repositoryName");
    newModel.setDefaultValue("groupName");
    newModel.setDefaultValue("reportArtifactList");
    setModel({...newModel});
  };

  return (
     <SelectInputBase
       fieldName={"artifactoryType"}
       dataObject={model}
       setDataObject={setModel}
       selectOptions={ARTIFACTORY_TYPES}
       valueField={"value"}
       textField={"name"}
       placeholderText={"Select a Artifactory Type"}
       setDataFunction={setDataFunction}
       disabled={disabled}
       busy={isLoading}
     />
  );
}

OracleFusionReportMigrationStepArtifactoryTypeSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default OracleFusionReportMigrationStepArtifactoryTypeSelectInput;
