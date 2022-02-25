import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import accountsActions from "components/admin/accounts/accounts-actions";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";

function LdapUserSelectInput(
  {
    model,
    setModel,
    fieldName,
    valueField,
    textField,
    showClearValueButton,
    setDataFunction,
    className,
  }) {
  const { getAccessToken, getUserRecord, setAccessRoles, isSassUser } = useContext(AuthContext);
  const toastContext  = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  
  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);


  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      const user = await getUserRecord();
      const {ldap} = user;
      const userRoleAccess = await setAccessRoles(user);

      if (userRoleAccess && userRoleAccess?.Type !== "sass-user" && ldap.domain != null) {
        await getUsers(cancelSource);
      }
    }
    catch (error) {
      toastContext.showErrorDialog(error,"Could not load users.");
    }
    finally {
      setIsLoading(false);
    }
  };

  const getUsers = async (cancelSource = cancelTokenSource) => {
    let response = await accountsActions.getAccountUsersV2(getAccessToken, cancelSource);
    const users = response?.data;

    if (Array.isArray(users)) {
      let formattedUsers = [];

      // TODO: Rework this
      users.map((user) => {
        formattedUsers.push({text: `${user.firstName} ${user.lastName} (${user.email})`, emailAddress: `${user?.email}`, value:`${user._id}`, user: user});
      });

      setUsers(formattedUsers);
    }
  };

  const getCurrentValue = () => {
    const currentValue = model?.getData(fieldName);

    if (typeof currentValue === 'object' && currentValue !== null) {
      if (currentValue._id) {
        return currentValue._id;
      }
    }

    return currentValue;
  };

  if (isSassUser() === true) {
    return null;
  }

  return (
    <SelectInputBase
      fieldName={fieldName}
      busy={isLoading}
      placeholderText={"Select User"}
      valueField={valueField}
      className={className}
      textField={textField}
      showClearValueButton={showClearValueButton}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      getCurrentValue={getCurrentValue}
      dataObject={model}
      selectOptions={users}
    />
  );
}

LdapUserSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  valueField: PropTypes.string,
  showClearValueButton: PropTypes.bool,
  textField: PropTypes.string,
  setDataFunction: PropTypes.func,
  className: PropTypes.string,
};

LdapUserSelectInput.defaultProps = {
  valueField: "value",
  textField: "text",
  showClearValueButton: true,
};

export default LdapUserSelectInput;


