import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";
function AnsibleStepToolSelectInput({ fieldName, model, setModel, disabled, className }) {

  
  return (
    <RoleRestrictedToolByIdentifierInputBase
      toolIdentifier={"ansible"}
      toolFriendlyName={"Ansible"}
      fieldName={fieldName}
      placeholderText={"Select a Ansible Connect Instance"}
      configurationRequired={true}
      model={model}
      setModel={setModel}
      disabled={disabled}
      className={className}
    />
  );
}

AnsibleStepToolSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

AnsibleStepToolSelectInput.defaultProps = {
  fieldName: "toolConfigId",
};

export default AnsibleStepToolSelectInput;
