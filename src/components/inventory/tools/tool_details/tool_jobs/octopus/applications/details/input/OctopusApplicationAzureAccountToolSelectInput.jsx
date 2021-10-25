import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedAzureAccountToolSelectInput
  from "components/common/list_of_values_input/tools/azure_account/RoleRestrictedAzureAccountToolSelectInput";

function OctopusApplicationAzureAccountToolSelectInput({ fieldName, dataObject, setDataObject, disabled}) {
  return (
    <RoleRestrictedAzureAccountToolSelectInput
      fieldName={fieldName}
      model={dataObject}
      setModel={setDataObject}
      disabled={disabled}
    />
  );
}

OctopusApplicationAzureAccountToolSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default OctopusApplicationAzureAccountToolSelectInput;