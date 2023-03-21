import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {hasStringValue} from "components/common/helpers/string-helpers";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import useLdapUserActions from "hooks/ldap/users/useLdapUserActions";

export default function useGetLdapUsersInCurrentUserDomain(handleErrorFunction) {
  const [users, setUsers] = useState([]);
  const ldapUserActions = useLdapUserActions();
  const {
    isSaasUser,
  } = useComponentStateReference();
  const {
    isLoading,
    error,
    loadData,
  } = useLoadData();

  useEffect(() => {
    setUsers([]);

    if (loadData) {
      loadData(getLdapUsersForDomain, handleErrorFunction).catch(() => {
      });
    }
  }, []);

  const getLdapUsersForDomain = async () => {
    setUsers([]);

    if (isSaasUser !== false) {
      return;
    }

    const response = await ldapUserActions.getLdapUsers();
    setUsers([...DataParsingHelper.parseNestedArray(response, "data.data", [])]);
  };

  return ({
    users: users,
    setUsers: setUsers,
    error: error,
    loadData: () => loadData(getLdapUsersForDomain, handleErrorFunction),
    isLoading: isLoading,
  });
}
