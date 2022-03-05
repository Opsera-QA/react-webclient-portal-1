import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedSpinnakerToolSelectInput
  from "components/common/list_of_values_input/tools/spinnaker/tool/RoleRestrictedSpinnakerToolSelectInput";

function SpinnakerStepSpinnakerToolSelectInput({model, setModel, fieldName, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = model;
    newDataObject.setData(fieldName, selectedOption?._id);
    newDataObject.setData("toolURL", selectedOption?.configuration?.toolURL);
    setModel({...newDataObject});
  };

  return (
    <RoleRestrictedSpinnakerToolSelectInput
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      disabled={disabled}
    />
  );
}

SpinnakerStepSpinnakerToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.func,
  disabled: PropTypes.bool,
};

SpinnakerStepSpinnakerToolSelectInput.defaultProps = {
  fieldName: "spinnakerId",
};

export default SpinnakerStepSpinnakerToolSelectInput;
