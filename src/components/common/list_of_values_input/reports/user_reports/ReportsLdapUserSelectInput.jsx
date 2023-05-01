import React from "react";
import PropTypes from "prop-types";
import LdapUserSelectInput from "components/common/list_of_values_input/users/LdapUserSelectInput";
import useComponentStateReference from "hooks/useComponentStateReference";

function ReportsLdapUserSelectInput({ model, setModel }) {
  const { isSaasUser } = useComponentStateReference();

  const setDataFunction = (fieldName, value) => {
    const newModel = model;
    const user = value?.user;

    newModel.setData("user", user);

    if (user) {
      newModel.setData("_id", user?._id);
      newModel.setData("name", `${user?.firstName} ${user.lastName}` );
      newModel.setData("firstName", user?.firstName);
      newModel.setData("lastName", user?.lastName);
      newModel.setData("emailAddress", user?.email);
    }

    setModel({...model});
  };

  if (isSaasUser !== false) {
    return null;
  }

  return (
    <LdapUserSelectInput
      model={model}
      setModel={setModel}
      fieldName={"name"}
      setDataFunction={setDataFunction}
    />
  );
}

ReportsLdapUserSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
};

export default ReportsLdapUserSelectInput;


