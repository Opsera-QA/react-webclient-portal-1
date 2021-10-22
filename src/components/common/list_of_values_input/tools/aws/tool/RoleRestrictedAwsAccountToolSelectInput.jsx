import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase
  from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";

function RoleRestrictedAwsAccountToolSelectInput(
  {
    fieldName,
    model,
    setModel,
    valueField,
    textField,
    disabled,
    filterDataFunction,
  }) {
  return (
    <RoleRestrictedToolByIdentifierInputBase
      toolIdentifier={"aws_account"}
      toolFriendlyName={"AWS"}
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      valueField={valueField}
      textField={textField}
      disabled={disabled}
      filterDataFunction={filterDataFunction}
    />
  );
}

RoleRestrictedAwsAccountToolSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  valueField: PropTypes.string,
  filterDataFunction: PropTypes.func
};

export default RoleRestrictedAwsAccountToolSelectInput;