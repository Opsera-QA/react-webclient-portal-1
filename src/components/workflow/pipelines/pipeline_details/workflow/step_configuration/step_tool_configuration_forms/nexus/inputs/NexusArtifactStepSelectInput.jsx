import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const NexusArtifactStepSelectInput = ({dataObject, setDataObject, disabled, listOfSteps}) => {
  return (
    <SelectInputBase
      fieldName={"artifactStepId"}
      dataObject={dataObject}
      setDataObject={setDataObject}      
      selectOptions={listOfSteps ? listOfSteps : []}      
      valueField="_id"
      textField="name"      
      disabled={disabled || dataObject.getData("nexusToolConfigId") === ""}
    />
  );
};

NexusArtifactStepSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  listOfSteps: PropTypes.array,
};

NexusArtifactStepSelectInput.defaultProps = {
  visible: true
};

export default NexusArtifactStepSelectInput;
