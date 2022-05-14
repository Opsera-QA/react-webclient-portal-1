import React, {useContext} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import LdapOwnerFilter from "components/common/filters/ldap/owner/LdapOwnerFilter";

function OwnershipReportLdapUserSelectInput({ model, loadData }) {
  const { isSassUser } = useContext(AuthContext);

  const setDataFunction = (fieldName, value) => {
    model.setData("owner", value);
    loadData(model);
  };

  if (isSassUser() === true) {
    return null;
  }

  return (
    <LdapOwnerFilter
      filterModel={model}
      fieldName={"owner"}
      setDataFunction={setDataFunction}
    />
  );
}

OwnershipReportLdapUserSelectInput.propTypes = {
  model: PropTypes.object,
  loadData: PropTypes.func,
};

export default OwnershipReportLdapUserSelectInput;


