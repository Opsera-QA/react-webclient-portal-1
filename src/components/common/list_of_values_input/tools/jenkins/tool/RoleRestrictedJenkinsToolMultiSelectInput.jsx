import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierMultiSelectInputBase
  from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierMultiSelectInputBase";

function RoleRestrictedJenkinsToolMultiSelectInput({model, setModel, setDataFunction, clearDataFunction, fieldName, disabled}) {
  return (
    <RoleRestrictedToolByIdentifierMultiSelectInputBase
      toolIdentifier={"jenkins"}
      toolFriendlyName={"Jenkins"}
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

RoleRestrictedJenkinsToolMultiSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
  clearDataFunction: PropTypes.func,
  setDataFunction: PropTypes.func,
};

export default RoleRestrictedJenkinsToolMultiSelectInput;