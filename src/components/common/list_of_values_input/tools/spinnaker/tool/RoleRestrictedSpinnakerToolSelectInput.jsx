import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";

function RoleRestrictedSpinnakerToolSelectInput({className, fieldName, model, setModel, setDataFunction, disabled}) {
  return (
     <RoleRestrictedToolByIdentifierInputBase
       toolIdentifier={"spinnaker"}
       toolFriendlyName={"Spinnaker"}
       fieldName={fieldName}
       placeholderText={"Select Spinnaker Tool"}
       configurationRequired={true}
       model={model}
       setModel={setModel}
       setDataFunction={setDataFunction}
       disabled={disabled}
       className={className}
     />
  );
}

RoleRestrictedSpinnakerToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  setDataFunction: PropTypes.func,
};

export default RoleRestrictedSpinnakerToolSelectInput;
