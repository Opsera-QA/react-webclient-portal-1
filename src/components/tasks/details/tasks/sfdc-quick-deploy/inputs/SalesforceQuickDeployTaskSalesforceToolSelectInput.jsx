import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedSalesforceConfiguratorToolSelectInput
  from "components/common/list_of_values_input/tools/salesforce/sfdc-configurator/RoleRestrictedSalesforceConfiguratorToolSelectInput";

function SalesforceQuickDeployTaskSalesforceToolSelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("sfdcToolId", selectedOption?._id);
    newModel.setData("accountUsername",selectedOption.configuration.accountUsername);
    newModel.setData("sfdcToolName", selectedOption.name);
    setModel({...newModel});
  };

  const clearDataFunction = () => {
    let newModel = {...model};
    newModel.setDefaultValue("sfdcToolId");
    newModel.setDefaultValue("accountUsername");
    newModel.setDefaultValue("sfdcToolName");
    setModel({...newModel});
  };

  return (
     <RoleRestrictedSalesforceConfiguratorToolSelectInput
       fieldName={"sfdcToolId"}
       model={model}
       setModel={setModel}
       setDataFunction={setDataFunction}
       clearDataFunction={clearDataFunction}
       disabled={disabled}
     />
  );
}

SalesforceQuickDeployTaskSalesforceToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SalesforceQuickDeployTaskSalesforceToolSelectInput;
