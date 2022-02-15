import React from 'react';
import PropTypes from "prop-types";
import StandaloneMultiSelectInput from "components/common/inputs/multi_select/StandaloneMultiSelectInput";

const AccessRuleSsoUserOrganizationNameStandaloneMultiSelectInput = (
  {
    value,
    setDataFunction,
    disabled,
    ssoUserOrganizationNames,
  }) => {
  return (
    <StandaloneMultiSelectInput
      selectOptions={ssoUserOrganizationNames}
      valueField={"organizationName"}
      textField={"organizationName"}
      value={value}
      placeholderText={"Select Allowed SSO User Organization Names"}
      setDataFunction={setDataFunction}
      disabled={disabled}
    />
  );
};

AccessRuleSsoUserOrganizationNameStandaloneMultiSelectInput.propTypes = {
  value: PropTypes.string,  
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  setDataFunction: PropTypes.func,
  ssoUserOrganizationNames: PropTypes.array,
};

export default AccessRuleSsoUserOrganizationNameStandaloneMultiSelectInput;