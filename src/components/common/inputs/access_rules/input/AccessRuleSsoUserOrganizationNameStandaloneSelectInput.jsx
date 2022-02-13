import React from 'react';
import PropTypes from "prop-types";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";

const AccessRuleSsoUserOrganizationNameStandaloneSelectInput = (
  {
    value,
    setDataFunction,
    disabled,
    ssoUserOrganizationNames,
  }) => {
  return (
    <StandaloneSelectInput
      selectOptions={ssoUserOrganizationNames}
      valueField={"organizationName"}
      textField={"organizationName"}
      value={value}
      placeholderText={"Select SSO User Organization Name"}
      setDataFunction={setDataFunction}
      disabled={disabled}
    />
  );
};

AccessRuleSsoUserOrganizationNameStandaloneSelectInput.propTypes = {
  value: PropTypes.string,  
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  setDataFunction: PropTypes.func,
  ssoUserOrganizationNames: PropTypes.array,
};

export default AccessRuleSsoUserOrganizationNameStandaloneSelectInput;