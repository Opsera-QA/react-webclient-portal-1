import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import useGetLdapUsers from "components/settings/ldap_users/hooks/useGetLdapUsers";

export default function LdapUserSelectInput(
  {
    model,
    setModel,
    fieldName,
    valueField,
    textField,
    showClearValueButton,
    setDataFunction,
    className,
  }) {
  const {
    ldapUsers,
    error,
    isLoading,
  } = useGetLdapUsers();
  const {
    isSaasUser,
  } = useComponentStateReference();

  const getCurrentValue = () => {
    const currentValue = model?.getData(fieldName);

    if (typeof currentValue === 'object' && currentValue !== null) {
      if (currentValue._id) {
        return currentValue._id;
      }
    }

    return currentValue;
  };

  if (isSaasUser !== false) {
    return null;
  }

  return (
    <SelectInputBase
      fieldName={fieldName}
      busy={isLoading}
      valueField={valueField}
      className={className}
      textField={textField}
      showClearValueButton={showClearValueButton}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      error={error}
      singularTopic={"User"}
      pluralTopic={"Users"}
      getCurrentValue={getCurrentValue}
      dataObject={model}
      selectOptions={ldapUsers}
    />
  );
}

LdapUserSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  valueField: PropTypes.string,
  showClearValueButton: PropTypes.bool,
  textField: PropTypes.string,
  setDataFunction: PropTypes.func,
  className: PropTypes.string,
};

LdapUserSelectInput.defaultProps = {
  valueField: "value",
  textField: "text",
  showClearValueButton: true,
};

