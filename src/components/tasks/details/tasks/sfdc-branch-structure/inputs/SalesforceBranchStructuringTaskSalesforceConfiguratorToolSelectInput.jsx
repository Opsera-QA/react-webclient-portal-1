import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedSalesforceDxToolSelectInput
  from "components/common/list_of_values_input/tools/salesforce/sfdc-configurator/RoleRestrictedSalesforceDxToolSelectInput";

function SalesforceBranchStructuringTaskSalesforceConfiguratorToolSelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("sfdcToolId", selectedOption?._id);
    newModel.setData("accountUsername",selectedOption?.configuration?.accountUsername);
    newModel.setData("sfdcToolName", selectedOption?.name);
    setModel({...newModel});
  };

  return (
     <RoleRestrictedSalesforceDxToolSelectInput
       fieldName={"sfdcToolId"}
       model={model}
       setModel={setModel}
       setDataFunction={setDataFunction}
       disabled={disabled}
     />
  );
}

SalesforceBranchStructuringTaskSalesforceConfiguratorToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SalesforceBranchStructuringTaskSalesforceConfiguratorToolSelectInput;