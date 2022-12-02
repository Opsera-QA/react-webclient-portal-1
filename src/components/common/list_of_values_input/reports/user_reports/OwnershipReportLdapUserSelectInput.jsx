import React, {useContext} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import LdapOwnerFilter from "components/common/filters/ldap/owner/LdapOwnerFilter";

function OwnershipReportLdapUserSelectInput({ model, loadData }) {
  const { isSassUser } = useContext(AuthContext);

  const setDataFunction = (fieldName, user) => {
    model.setData("owner", user?._id);
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


