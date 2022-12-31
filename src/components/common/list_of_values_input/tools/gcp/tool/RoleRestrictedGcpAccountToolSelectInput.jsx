import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase
  from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";

function RoleRestrictedGcpAccountToolSelectInput(
  {
    fieldName,
    model,
    setModel,
    valueField,
    textField,
    disabled,
    filterDataFunction,
    setDataFunction,
    clearDataFunction,
  }) {
  return (
    <RoleRestrictedToolByIdentifierInputBase
      toolIdentifier={"gcp_account"}
      toolFriendlyName={"GCP"}
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      valueField={valueField}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      textField={textField}
      disabled={disabled}
      filterDataFunction={filterDataFunction}
    />
  );
}

RoleRestrictedGcpAccountToolSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  valueField: PropTypes.string,
  filterDataFunction: PropTypes.func,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
};

export default RoleRestrictedGcpAccountToolSelectInput;
