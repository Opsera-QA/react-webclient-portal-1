import React from 'react';
import PropTypes from 'prop-types';
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function SalesforceOrganizationSyncTaskIncludePackageXmlToggleInput({model, setModel, disabled}) {
  return (
    <BooleanToggleInput
      dataObject={model}
      setDataObject={setModel}
      fieldName={"includePackageXml"}
      disabled={disabled}
    />
  );
}

SalesforceOrganizationSyncTaskIncludePackageXmlToggleInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SalesforceOrganizationSyncTaskIncludePackageXmlToggleInput;