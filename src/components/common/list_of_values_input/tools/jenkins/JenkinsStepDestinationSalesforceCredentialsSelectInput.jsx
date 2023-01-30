import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedSalesforceConfiguratorToolSelectInput
  from "components/common/list_of_values_input/tools/salesforce/sfdc-configurator/RoleRestrictedSalesforceConfiguratorToolSelectInput";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function JenkinsStepDestinationSalesforceCredentialsSelectInput(
  {
    model,
    setModel,
    disabled,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    model.setData('sfdcDestToolId', selectedOption._id);
    model.setData('destAccountUsername', DataParsingHelper.parseNestedString(selectedOption, "configuration.destAccountUsername", ""));
    setModel({...model});
  };

  return (
    <RoleRestrictedSalesforceConfiguratorToolSelectInput
      fieldName={'sfdcDestToolId'}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      disabled={disabled}
    />
  );
}

JenkinsStepDestinationSalesforceCredentialsSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  sfdcList: PropTypes.any,
  busy: PropTypes.bool,
};
