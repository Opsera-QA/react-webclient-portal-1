import React from "react";
import PropTypes from "prop-types";
import LdapOpseraUserSelectInputBase
  from "components/common/list_of_values_input/admin/accounts/ldap_accounts/LdapOpseraUserSelectInputBase";

function LdapOrganizationAccountOpseraUserSelectInput({ dataObject, setDataObject}) {
  const addAdmin = (user) => {
    let newAdmin = {
      name: user.accountName,
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.email,
      departmentName: user.organizationName,
      preferredName: "",
      division: "",
      teams: [],
      title: "",
      site: ""
    };

    dataObject.setData("administrator", {...newAdmin});
    setDataObject({...dataObject});
  };

  const handleOpseraUserChange = (selectedOption) => {
    dataObject.setData("orgOwner", selectedOption["firstName"] + " " + selectedOption["lastName"]);
    dataObject.setData("orgOwnerEmail", selectedOption["email"]);
    setDataObject({...selectedOption});
    addAdmin(selectedOption);
  };

  return (
    <LdapOpseraUserSelectInputBase setDataFunction={handleOpseraUserChange} dataObject={dataObject} setDataObject={setDataObject} />
  );
}

LdapOrganizationAccountOpseraUserSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  textField: PropTypes.string,
  valueField: PropTypes.string
};

export default LdapOrganizationAccountOpseraUserSelectInput;