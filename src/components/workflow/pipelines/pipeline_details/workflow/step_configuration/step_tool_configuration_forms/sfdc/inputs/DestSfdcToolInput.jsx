import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedSalesforceConfiguratorToolSelectInput
  from "components/common/list_of_values_input/tools/salesforce/sfdc-configurator/RoleRestrictedSalesforceConfiguratorToolSelectInput";

function DestSfdcToolInput({dataObject, setDataObject, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("sfdcDestToolId", selectedOption?._id);
    newDataObject.setData("destAccountUsername",selectedOption?.configuration?.accountUsername);
    newDataObject.setData("sfdcDestToolName", selectedOption?.name);
    setDataObject({...newDataObject});
  };

  const clearDataFunction = () => {
    let newDataObject = {...dataObject};
    newDataObject.setData("sfdcDestToolId", "");
    newDataObject.setData("destAccountUsername", "");
    newDataObject.setData("sfdcDestToolName", "");
    setDataObject({...newDataObject});
  };

  return (
     <RoleRestrictedSalesforceConfiguratorToolSelectInput
       fieldName={"sfdcDestToolId"}
       model={dataObject}
       setModel={setDataObject}
       setDataFunction={setDataFunction}
       disabled={disabled}
       clearDataFunction={clearDataFunction}
     />
  );
}

DestSfdcToolInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default DestSfdcToolInput;
