import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import accountsActions from "components/admin/accounts/accounts-actions";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import {hasStringValue} from "components/common/helpers/string-helpers";

function LdapUserByDomainSelectInput(
  {
    model,
    setModel,
    fieldName,
    valueField,
    textField,
    showClearValueButton,
    setDataFunction,
    organizationDomain,
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

    if (isSassUser() === false) {
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      const user = await getUserRecord();
      const ldap = user?.ldap;
      const userRoleAccess = await setAccessRoles(user);

      if (userRoleAccess && userRoleAccess?.Type !== "sass-user" && ldap?.domain != null) {
        // Because Opsera Administrators can add LDAP Groups, Departments, etc. we need to be able to force lookup
        // for users in those domains. Otherwise, we default to users in the active user's organization account.
        const domainToCheck =
          hasStringValue(organizationDomain) && userRoleAccess?.OpseraAdministrator ? organizationDomain : ldap?.domain;
        await getUsers(cancelSource, domainToCheck);
      }
    }
    catch (error) {
      console.error(error);
      toastContext.showErrorDialog(error,"Could not load users.");
    }
    finally {
      setIsLoading(false);
    }
  };

  const getUsers = async (cancelSource = cancelTokenSource, ldapDomain) => {
    const response = await accountsActions.getLdapUsersWithDomainV2(getAccessToken, cancelSource, ldapDomain);
    const users = response?.data;

    if (Array.isArray(users)) {
      let formattedUsers = [];

      users.map((user) => {
        formattedUsers.push({text: `${user.name} (${user.emailAddress})`, value:`${user.emailAddress}`, user: user});
      });

      setUsers(formattedUsers);
    }
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
      textField={textField}
      showClearValueButton={showClearValueButton}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      dataObject={model}
      selectOptions={users}
    />
  );
}

LdapUserByDomainSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  valueField: PropTypes.string,
  showClearValueButton: PropTypes.bool,
  textField: PropTypes.string,
  setDataFunction: PropTypes.func,
  organizationDomain: PropTypes.string,
};

LdapUserByDomainSelectInput.defaultProps = {
  valueField: "value",
  textField: "text",
  showClearValueButton: true,
};

export default LdapUserByDomainSelectInput;


