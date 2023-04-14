import React from "react";
import PropTypes from "prop-types";
import LdapOwnerFilter from "components/common/filters/ldap/owner/LdapOwnerFilter";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function OwnershipReportLdapUserSelectInput(
  {
    model,
    loadData,
    placeholderText,
  }) {
  const { isSaasUser } = useComponentStateReference();

  const setDataFunction = (fieldName, user) => {
    model.setData("owner", user?._id);
    loadData(model);
  };

  const clearDataFunction = () => {
    model.setDefaultValue("owner");
    loadData(model);
  };

  if (isSaasUser === true) {
    return null;
  }

  return (
    <LdapOwnerFilter
      filterModel={model}
      fieldName={"owner"}
      setDataFunction={setDataFunction}
      placeholderText={placeholderText}
      clearDataFunction={clearDataFunction}
    />
  );
}

OwnershipReportLdapUserSelectInput.propTypes = {
  model: PropTypes.object,
  loadData: PropTypes.func,
  placeholderText: PropTypes.string,
};
