import React from "react";
import PropTypes from "prop-types";
import LdapOpseraUserSelectInputBase
  from "components/common/list_of_values_input/admin/accounts/ldap_accounts/LdapOpseraUserSelectInputBase";

function LdapOrganizationOpseraUserSelectInput({ model, setModel}) {
  const handleOpseraUserChange = (fieldName, selectedOption) => {
    let newModel = model;
    newModel.setData("orgOwner", selectedOption?.firstName + " " + selectedOption?.lastName);
    newModel.setData("orgOwnerEmail", selectedOption?.email);
    setModel({...newModel});
  };

  return (
    <LdapOpseraUserSelectInputBase
      model={model} 
      setDataFunction={handleOpseraUserChange} 
    />
  );
}

LdapOrganizationOpseraUserSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
};

export default LdapOrganizationOpseraUserSelectInput;