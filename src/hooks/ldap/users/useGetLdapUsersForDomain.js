import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {hasStringValue} from "components/common/helpers/string-helpers";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import useLdapUserActions from "hooks/ldap/users/useLdapUserActions";

// TODO: We should make one that just pulls the items based off the domain on the user object and reserve this just for admin use
export default function useGetLdapUsersForDomain(domain, handleErrorFunction) {
  const [users, setUsers] = useState([]);
  const ldapUserActions = useLdapUserActions();
  const {
    userData,
    isSaasUser,
    isOpseraAdministrator,
  } = useComponentStateReference();
  const {
    isLoading,
    error,
    loadData,
  } = useLoadData();

  useEffect(() => {
    setUsers([]);

    const ldapDomain = DataParsingHelper.parseNestedString(userData, "ldap.domain");

    if (
      isSaasUser === false
      && hasStringValue(domain) === true
      && (ldapDomain === domain || isOpseraAdministrator === true)
      && loadData
    ) {
      loadData(getLdapUsersForDomain, handleErrorFunction).catch(() => {
      });
    }
  }, []);

  const getLdapUsersForDomain = async () => {
    const response = await ldapUserActions.getLdapUsersWithDomainV2(
      domain,
    );
    setUsers([...DataParsingHelper.parseNestedArray(response, "data", [])]);
  };

  return ({
    users: users,
    setUsers: setUsers,
    error: error,
    loadData: () => loadData(getLdapUsersForDomain, handleErrorFunction),
    isLoading: isLoading,
  });
}
