import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedSalesforceConfiguratorToolSelectInput
  from "components/common/list_of_values_input/tools/salesforce/sfdc-configurator/RoleRestrictedSalesforceConfiguratorToolSelectInput";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function JenkinsStepSalesforceConfiguratorToolSelectInput(
  {
    model,
    setModel,
    disabled,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    model.setData('sfdcToolId', selectedOption._id);
    model.setData('accountUsername', DataParsingHelper.parseNestedString(selectedOption, "configuration.accountUsername", ""));
    model.setData('sfdcUnitTestType', "");
    model.setData('ruleIds', []);
    setModel({...model});
  };
  
  return (
    <RoleRestrictedSalesforceConfiguratorToolSelectInput
      fieldName={'sfdcToolId'}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      disabled={disabled}
    />
  );
  
}
JenkinsStepSalesforceConfiguratorToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};
