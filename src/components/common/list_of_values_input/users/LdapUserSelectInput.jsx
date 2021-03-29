import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import accountsActions from "components/admin/accounts/accounts-actions";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function LdapUserSelectInput({ dataObject, setDataObject, fieldName, valueField, textField, showClearValueButton, setDataFunction }) {
  const { getAccessToken, getUserRecord, setAccessRoles } = useContext(AuthContext);
  const toastContext  = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const user = await getUserRecord();
      const {ldap} = user;
      setUser(user);
      const userRoleAccess = await setAccessRoles(user);
      setAccessRoleData(userRoleAccess);

      if (userRoleAccess && userRoleAccess?.Type !== "sass-user" && ldap.domain != null)
      {
        await getUsers();
      }
    }
    catch (error) {
      toastContext.showErrorDialog(error,"Could not load users.");
    }
    finally {
      setIsLoading(false);
    }
  };

  const getUsers = async () => {
    let response = await accountsActions.getAccountUsers(getAccessToken);
    let userOptions = [];
    const parsedUsers = response?.data;

    if (Array.isArray(parsedUsers) && parsedUsers.length > 0) {
      parsedUsers.map((user) => {
        userOptions.push({text: `${user.firstName} ${user.lastName} (${user.email})`, value:`${user._id}`, user: user});
      });
    }

    setUsers(userOptions);
  };

  const getCurrentValue = () => {
    const currentValue = dataObject?.getData(fieldName);

    if (typeof currentValue === 'object' && currentValue !== null) {
      if (currentValue._id) {
        return currentValue._id;
      }
    }

    return currentValue;
  };

  if (user == null || user.ldap?.domain == null || accessRoleData == null || accessRoleData?.Type === "sass-user") {
    return null;
  }

  return (
    <SelectInputBase
      fieldName={fieldName}
      busy={isLoading}
      placeholderText={"Select User"}
      valueField={valueField}
      textField={textField}
      showClearValueButton={showClearValueButton}
      setDataObject={setDataObject}
      setDataFunction={setDataFunction}
      getCurrentValue={getCurrentValue}
      dataObject={dataObject}
      selectOptions={users}
    />
  );
}

LdapUserSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string,
  valueField: PropTypes.string,
  showClearValueButton: PropTypes.bool,
  textField: PropTypes.string,
  setDataFunction: PropTypes.func
};

LdapUserSelectInput.defaultProps = {
  valueField: "value",
  textField: "text",
  showClearValueButton: true
};

export default LdapUserSelectInput;


