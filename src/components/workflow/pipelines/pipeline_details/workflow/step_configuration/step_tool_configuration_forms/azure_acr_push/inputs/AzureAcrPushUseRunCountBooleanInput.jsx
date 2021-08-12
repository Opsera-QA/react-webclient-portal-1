import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function AzureAcrPushUseRunCountBooleanInput({dataObject, setDataObject, disabled}) {
  
  return (
      <BooleanToggleInput
        fieldName={"useRunCount"}
        dataObject={dataObject}       
        setDataObject={setDataObject}
        disabled={disabled}
      />
  );
}

AzureAcrPushUseRunCountBooleanInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default AzureAcrPushUseRunCountBooleanInput;