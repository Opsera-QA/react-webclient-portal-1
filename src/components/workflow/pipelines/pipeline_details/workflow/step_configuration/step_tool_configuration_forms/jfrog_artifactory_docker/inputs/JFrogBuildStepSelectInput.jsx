import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "../../../../../../../../common/inputs/select/SelectInputBase";

function JFrogBuildStepSelectInput({dataObject, setDataObject, disabled, options}) {

  return (
    <SelectInputBase
      fieldName={"buildStepId"}
      selectOptions={options}
      dataObject={dataObject}
      valueField={"_id"}
      textField={"name"}
      setDataObject={setDataObject}
      disabled={disabled}
    />
  );
}

JFrogBuildStepSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  options: PropTypes.array
};

export default JFrogBuildStepSelectInput;