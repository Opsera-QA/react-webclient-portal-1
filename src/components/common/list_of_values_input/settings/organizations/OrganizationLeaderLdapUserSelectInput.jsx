import React, {useContext} from "react";
import PropTypes from "prop-types";
import LdapUserSelectInput from "components/common/list_of_values_input/users/LdapUserSelectInput";
import useComponentStateReference from "hooks/useComponentStateReference";

function OrganizationLeaderLdapUserSelectInput({ dataObject, setDataObject, fieldName}) {
  const { isSaasUser } = useComponentStateReference();

  const handleLdapUserChange = (fieldName, selectedOption) => {
    const leader = {
      name: `${selectedOption?.user?.firstName} ${selectedOption?.user?.lastName}`,
      email: selectedOption?.user?.email,
      _id: selectedOption?.user?._id,
    };
    console.log("leader: " + JSON.stringify(leader));
    dataObject.setData("leader", leader);
    setDataObject({...dataObject});
  };

  if (isSaasUser !== false) {
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