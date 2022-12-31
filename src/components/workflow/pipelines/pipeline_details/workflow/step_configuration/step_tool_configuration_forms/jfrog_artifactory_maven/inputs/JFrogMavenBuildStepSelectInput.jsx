import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "../../../../../../../../common/inputs/select/SelectInputBase";

function JFrogMavenBuildStepSelectInput({dataObject, setDataObject, disabled, options}) {
  return (
    <SelectInputBase
      fieldName={"artifactStepId"}
      selectOptions={options}
      dataObject={dataObject}
      valueField={"_id"}
      textField={"name"}
      setDataObject={setDataObject}
      disabled={disabled}
    />
  );
}

JFrogMavenBuildStepSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  options: PropTypes.array
};

export default JFrogMavenBuildStepSelectInput;
