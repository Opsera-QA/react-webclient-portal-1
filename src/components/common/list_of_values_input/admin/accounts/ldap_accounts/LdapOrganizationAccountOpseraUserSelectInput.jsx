import React from "react";
import PropTypes from "prop-types";
import LdapOpseraUserSelectInputBase
  from "components/common/list_of_values_input/admin/accounts/ldap_accounts/LdapOpseraUserSelectInputBase";

function LdapOrganizationAccountOpseraUserSelectInput({model, setModel}) {
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

    model.setData("administrator", {...newAdmin});
    setModel({...model});
  };

  const handleOpseraUserChange = (fieldName, selectedOption) => {
    model.setData("orgOwner", selectedOption?.firstName + " " + selectedOption?.lastName);
    model.setData("orgOwnerEmail", selectedOption?.email);
    setModel({...selectedOption});
    addAdmin(selectedOption);
  };

  return (
    <LdapOpseraUserSelectInputBase
      setDataFunction={handleOpseraUserChange}
      model={model}
    />
  );
}

LdapOrganizationAccountOpseraUserSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
};

export default LdapOrganizationAccountOpseraUserSelectInput;