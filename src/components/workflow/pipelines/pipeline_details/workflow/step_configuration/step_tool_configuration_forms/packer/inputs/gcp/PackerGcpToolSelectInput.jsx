import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedGcpAccountToolSelectInput
  from "components/common/list_of_values_input/tools/gcp/tool/RoleRestrictedGcpAccountToolSelectInput";

function PackerGcpToolSelectInput({ fieldName, model, setModel, disabled, textField, valueField}) {

  return (
    <RoleRestrictedGcpAccountToolSelectInput
      fieldName={fieldName}
      model={model}
      setModel={setModel}      
      valueField={valueField}
      textField={textField}
      disabled={disabled}
    />
  );
}

PackerGcpToolSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
};

PackerGcpToolSelectInput.defaultProps = {
  valueField: "_id",
  textField: "name",
  fieldName: "gcpToolConfigId",
  
};

export default PackerGcpToolSelectInput;
