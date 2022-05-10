import React  from "react";
import PropTypes from "prop-types";
import RoleRestrictedServiceNowToolSelectInput
  from "components/common/list_of_values_input/tools/service_now/RoleRestrictedServiceNowToolSelectInput";

function ServiceNowToolsSelectInput(
  {
    valueField,
    textField,
    fieldName,
    model,
    setModel,
    disabled,
    setDataFunction,
    clearDataFunction,
  }) {
  return (
    <RoleRestrictedServiceNowToolSelectInput
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      valueField={valueField}
      textField={textField}
      disabled={disabled}
    />
  );
}

ServiceNowToolsSelectInput.propTypes = {
  fieldName: PropTypes.string,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
};

ServiceNowToolsSelectInput.defaultProps = {
  textField: "name",
  valueField: "_id",
};

export default ServiceNowToolsSelectInput;
