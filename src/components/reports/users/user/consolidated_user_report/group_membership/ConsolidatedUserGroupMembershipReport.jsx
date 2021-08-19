import React, { useContext, useState, useEffect, useRef } from "react";
import LoadingDialog from "components/common/status_notifications/loading";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import accountsActions from "components/admin/accounts/accounts-actions";
import axios from "axios";
import ConsolidatedUserReportGroupMembershipTable from "components/reports/users/user/consolidated_user_report/group_membership/ConsolidatedUserReportGroupMembershipTable";
import PropTypes from "prop-types";

function ConsolidatedUserGroupMembershipReport({ldapUserDistinguishedName}) {
  const {getUserRecord, getAccessToken, setAccessRoles} = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [groupList, setGroupList] = useState([]);
  const [domain, setDomain] = useState("");

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
      const user = await getUserRecord();
      const {ldap} = user;
      const userRoleAccess = await setAccessRoles(user);

      if (isMounted?.current === true && userRoleAccess) {
        setIsLoading(true);
        setAccessRoleData(userRoleAccess);
        setDomain(ldap?.domain);

        if (ldap.domain != null) {
          const groupResponse = await accountsActions.getLdapGroupsWithDomainV2(getAccessToken, cancelSource, ldap.domain);

          if (Array.isArray(groupResponse?.data)) {
            setGroupList(groupResponse?.data);
          }
        }
      }
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  if (!ldapUserDistinguishedName) {
    return null;
  }

  if (!accessRoleData) {
    return <LoadingDialog size="sm"/>;
  }

  return (
    <ConsolidatedUserReportGroupMembershipTable
      groups={groupList}
      isLoading={isLoading}
      loadData={loadData}
      domain={domain}
      userDistinguishedName={ldapUserDistinguishedName}
    />
  );
}

ConsolidatedUserGroupMembershipReport.propTypes = {
  ldapUserDistinguishedName: PropTypes.string,
};

export default ConsolidatedUserGroupMembershipReport;
