import React from "react";
import PropTypes from "prop-types";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import useGetLdapGroups from "hooks/ldap/groups/useGetLdapGroups";

export default function LdapGroupMultiSelectInput({ fieldName, model, setModel, setDataFunction, disabled }) {
  const {
    isSaasUser
  } = useComponentStateReference();
  const {
    loadData,
    groups,
    isLoading,
  } = useGetLdapGroups();

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

LdapGroupMultiSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  fieldName: PropTypes.string,
  disabled: PropTypes.bool,
};
