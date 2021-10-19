import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import accountsActions from "components/admin/accounts/accounts-actions";
import LdapGroupMembershipManagementPanel
  from "components/common/inputs/user/membership/manager/LdapGroupMembershipManagementPanel";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import LoadingDialog from "components/common/status_notifications/loading";

function LdapDepartmentMembershipPanel({ ldapDepartmentData, ldapDepartmentGroupData, orgDomain, setActiveTab }) {
  const toastContext = useContext(DialogToastContext);
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const [ldapUsers, setLdapUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [accessRoleData, setAccessRoleData] = useState({});
  const [authorizedActions, setAuthorizedActions] = useState([]);
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
  }, [orgDomain]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(cancelSource);
      setIsLoading(false);
    }
    catch (error) {
      if (isMounted.current === true && !error?.error?.message?.includes(404)) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getLdapUsers = async (cancelSource = cancelTokenSource) => {
    const response = await accountsActions.getLdapUsersWithDomainV2(getAccessToken, cancelSource, orgDomain);
    let ldapUsers = response?.data;

    if (isMounted.current === true && ldapUsers) {
      setLdapUsers(ldapUsers);
    }
  };

  const getRoles = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const ldap = user?.ldap;
    const userRoleAccess = await setAccessRoles(user);

    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      let authorizedActions;

      authorizedActions = await accountsActions.getAllowedRoleGroupActions(userRoleAccess, ldap.organization, getUserRecord, getAccessToken);
      setAuthorizedActions(authorizedActions);
      await getLdapUsers(cancelSource);
    }
  };

  if (isLoading) {
    return (<LoadingDialog size={"sm"} message={"Loading Users"} />);
  }

  // TODO: Do users pull in here
  return (
    <LdapGroupMembershipManagementPanel
      orgDomain={orgDomain}
      setActiveTab={setActiveTab}
      ldapGroupData={ldapDepartmentGroupData}
      authorizedActions={authorizedActions}
      ldapUsers={ldapUsers}
      loadData={loadData}
      type={"Department"}
    />
  );
}

LdapDepartmentMembershipPanel.propTypes = {
  ldapDepartmentData: PropTypes.object,
  ldapDepartmentGroupData: PropTypes.object,
  orgDomain: PropTypes.string,
  setActiveTab: PropTypes.func,
};


export default LdapDepartmentMembershipPanel;
