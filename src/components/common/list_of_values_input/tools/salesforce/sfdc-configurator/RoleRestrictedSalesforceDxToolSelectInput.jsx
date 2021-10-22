import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase
  from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";

function RoleRestrictedSalesforceDxToolSelectInput({model, setModel, setDataFunction, clearDataFunction, fieldName, disabled}) {
  const filterDataFunction = (tools) => {
    if (Array.isArray(tools) && tools.length > 0) {
      return tools.filter((tool) => {
        return tool?.configuration?.buildType === "sfdx";
      });
    }
  };

  return (
    <RoleRestrictedToolByIdentifierInputBase
      toolIdentifier={"sfdc-configurator"}
      toolFriendlyName={"Salesforce DX"}
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      filterDataFunction={filterDataFunction}
      disabled={disabled}
    />
  );
}

RoleRestrictedSalesforceDxToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
  clearDataFunction: PropTypes.func,
  setDataFunction: PropTypes.func,
};

export default RoleRestrictedSalesforceDxToolSelectInput;