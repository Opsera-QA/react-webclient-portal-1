import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedSalesforceConfiguratorToolSelectInput
  from "components/common/list_of_values_input/tools/salesforce/sfdc-configurator/RoleRestrictedSalesforceConfiguratorToolSelectInput";

function SalesforceStepToolSelectInput({dataObject, setDataObject, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("sfdcToolId", selectedOption.id);
    newDataObject.setData("accountUsername",selectedOption.configuration.accountUsername);
    newDataObject.setData("sfdcToolName", selectedOption.name);
    setDataObject({...newDataObject});
  };

  const clearDataFunction = () => {
    let newDataObject = {...dataObject};
    newDataObject.setData("sfdcToolId", "");
    newDataObject.setData("accountUsername", "");
    newDataObject.setData("sfdcToolName", "");
    setDataObject({...newDataObject});
  };

  return (
    <RoleRestrictedSalesforceConfiguratorToolSelectInput
      toolType={"sfdc-configurator"}
      toolFriendlyName={"Salesforce"}
      fieldName={"sfdcToolId"}
      configurationRequired={true}
      model={dataObject}
      setModel={setDataObject}
      setDataFunction={setDataFunction}
      disabled={disabled}
      clearDataFunction={clearDataFunction}
    />
  );
}

SalesforceStepToolSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SalesforceStepToolSelectInput;
