import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";
import {toolIdentifierConstants} from "components/admin/tools/identifiers/toolIdentifier.constants";

function RoleRestrictedAquasecToolSelectInput(
  {
    className,
    fieldName,
    model,
    setModel,
    disabled,
    setDataFunction,
    clearDataFunction,
  }) {
  return (
     <RoleRestrictedToolByIdentifierInputBase
       toolIdentifier={toolIdentifierConstants.TOOL_IDENTIFIERS.AQUASEC}
       toolFriendlyName={"Aquasec"}
       fieldName={fieldName}
       placeholderText={"Select Aquasec Tool"}
       configurationRequired={true}
       model={model}
       setModel={setModel}
       setDataFunction={setDataFunction}
       clearDataFunction={clearDataFunction}
       disabled={disabled}
       className={className}
     />
  );
}

RoleRestrictedAquasecToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
};

export default RoleRestrictedAquasecToolSelectInput;
