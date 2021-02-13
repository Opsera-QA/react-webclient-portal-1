import React from "react";
import PropTypes from "prop-types";
import LdapOpseraUserSelectInputBase
  from "components/common/list_of_values_input/admin/accounts/ldap_accounts/LdapOpseraUserSelectInputBase";

function LdapOrganizationOpseraUserSelectInput({ dataObject, setDataObject}) {
  const handleOpseraUserChange = (selectedOption) => {
    let newDataObject = dataObject;
    newDataObject.setData("orgOwner", selectedOption["firstName"] + " " + selectedOption["lastName"]);
    newDataObject.setData("orgOwnerEmail", selectedOption["email"]);
    setDataObject({...newDataObject});
  };

  return (
    <LdapOpseraUserSelectInputBase dataObject={dataObject} setDataObject={setDataObject} setDataFunction={handleOpseraUserChange} />
  );
}

LdapOrganizationOpseraUserSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
};

export default LdapOrganizationOpseraUserSelectInput;