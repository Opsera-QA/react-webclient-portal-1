import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";
import {toolIdentifierConstants} from "components/admin/tools/identifiers/toolIdentifier.constants";

function RoleRestrictedBlackDuckToolSelectInput(
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
       toolIdentifier={toolIdentifierConstants.TOOL_IDENTIFIERS.BLACKDUCK}
       toolFriendlyName={"BlackDuck"}
       fieldName={fieldName}
       placeholderText={"Select BlackDuck Tool"}
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

RoleRestrictedBlackDuckToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
};

export default RoleRestrictedBlackDuckToolSelectInput;
