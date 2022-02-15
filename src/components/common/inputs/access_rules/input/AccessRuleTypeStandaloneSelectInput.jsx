import React from 'react';
import PropTypes from "prop-types";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";
import {accessRuleTypeConstants} from "components/common/inputs/access_rules/constants/AccessRuleType.constants";

const AccessRuleTypeStandaloneSelectInput = ({ value, setDataFunction, disabled }) => {
  return (
    <StandaloneSelectInput
      selectOptions={accessRuleTypeConstants.ACCESS_RULE_TYPE_SELECT_OPTIONS}
      valueField={"value"}
      textField={"text"}
      value={value}
      placeholderText={"Select Access Rule Type"}
      setDataFunction={setDataFunction}
      disabled={disabled}
    />
  );
};

AccessRuleTypeStandaloneSelectInput.propTypes = {
  value: PropTypes.string,  
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
};

export default AccessRuleTypeStandaloneSelectInput;