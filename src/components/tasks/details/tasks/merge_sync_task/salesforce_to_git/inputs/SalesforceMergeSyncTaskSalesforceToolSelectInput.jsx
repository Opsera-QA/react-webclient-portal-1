import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedSalesforceConfiguratorToolSelectInput
  from "components/common/list_of_values_input/tools/salesforce/sfdc-configurator/RoleRestrictedSalesforceConfiguratorToolSelectInput";

function SalesforceMergeSyncTaskSalesforceToolSelectInput(
  {
    model,
    setModel,
    disabled,
    fieldName,
  }) {
  return (
     <RoleRestrictedSalesforceConfiguratorToolSelectInput
       fieldName={fieldName}
       model={model}
       setModel={setModel}
       disabled={disabled}
     />
  );
}

SalesforceMergeSyncTaskSalesforceToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  disabled: PropTypes.bool,
};

export default SalesforceMergeSyncTaskSalesforceToolSelectInput;
