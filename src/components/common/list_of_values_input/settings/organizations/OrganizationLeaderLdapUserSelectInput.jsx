import React, {useContext} from "react";
import PropTypes from "prop-types";
import LdapUserSelectInput from "components/common/list_of_values_input/users/LdapUserSelectInput";
import {AuthContext} from "contexts/AuthContext";

function OrganizationLeaderLdapUserSelectInput({ dataObject, setDataObject, fieldName}) {
  const { isSassUser } = useContext(AuthContext);

  const handleLdapUserChange = (fieldName, selectedOption) => {
    let newDataObject = dataObject;
    let leader = {};
    leader["name"] = selectedOption?.user?.firstName + " " + selectedOption?.user?.lastName;
    leader["email"] = selectedOption?.user?.email;
    leader["_id"] = selectedOption?.user?._id;
    newDataObject.setData("leader", leader);
    setDataObject({...newDataObject});
  };

  if (isSassUser() === true) {
    return null;
  }

  return (
    <LdapUserSelectInput
      model={dataObject}
      setModel={setDataObject}
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