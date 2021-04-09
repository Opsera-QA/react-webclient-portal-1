import React from "react";
import PropTypes from "prop-types";
import LdapUserSelectInput from "components/common/list_of_values_input/users/LdapUserSelectInput";

function OrganizationLeaderLdapUserSelectInput({ dataObject, setDataObject, fieldName}) {
  const handleLdapUserChange = (fieldName, selectedOption) => {
    let newDataObject = dataObject;
    let leader = {};
    leader["name"] = selectedOption?.user?.firstName + " " + selectedOption?.user?.lastName;
    leader["email"] = selectedOption?.user?.email;
    leader["_id"] = selectedOption?.user?._id;
    newDataObject.setData("leader", leader);
    setDataObject({...newDataObject});
  };

  return (
    <LdapUserSelectInput
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={handleLdapUserChange}
      fieldName={fieldName}
    />
  );
}

OrganizationLeaderLdapUserSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string
};

OrganizationLeaderLdapUserSelectInput.defaultProps = {
  fieldName: "leader"
};

export default OrganizationLeaderLdapUserSelectInput;