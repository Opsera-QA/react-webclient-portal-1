import React from "react";
import PropTypes from "prop-types";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import useGetLdapGroupsForDomain from "hooks/ldap/groups/useGetLdapGroupsForDomain";

export default function LdapGroupForDomainMultiSelectInput(
  {
    fieldName,
    model,
    setModel,
    setDataFunction,
    disabled,
    organizationDomain,
  }) {
  const {
    isSaasUser
  } = useComponentStateReference();
  const {
    loadData,
    groups,
    isLoading,
  } = useGetLdapGroupsForDomain(organizationDomain);

  if (isSaasUser !== false) {
    return null;
  }

  return (
    <MultiSelectInputBase
      disabled={disabled}
      setDataFunction={setDataFunction}
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={groups}
      valueField={"name"}
      textField={"name"}
      busy={isLoading}
      loadDataFunction={loadData}
    />
  );
}

LdapGroupForDomainMultiSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  fieldName: PropTypes.string,
  disabled: PropTypes.bool,
  organizationDomain: PropTypes.string,
};
