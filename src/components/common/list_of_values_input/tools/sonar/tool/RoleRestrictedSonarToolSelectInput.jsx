import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase
  from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";

function RoleRestrictedSonarToolSelectInput(
  {
    model,
    setModel,
    setDataFunction,
    clearDataFunction,
    fieldName,
    disabled,
  }) {
  return (
    <RoleRestrictedToolByIdentifierInputBase
      toolIdentifier={"sonar"}
      toolFriendlyName={"Sonar"}
      fieldName={fieldName}
      configurationRequired={true}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      disabled={disabled}
    />
  );
}

RoleRestrictedSonarToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
  clearDataFunction: PropTypes.func,
  setDataFunction: PropTypes.func,
};

export default RoleRestrictedSonarToolSelectInput;