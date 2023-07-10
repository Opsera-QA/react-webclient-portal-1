import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import useLdapUserActions from "hooks/ldap/users/useLdapUserActions";

export default function useGetDeactivatedLdapUsersInCurrentUserDomain(handleErrorFunction) {
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
      loadData(getDeactivatedLdapUsersInCurrentUserDomain, handleErrorFunction).catch(() => {
      });
    }
  }, []);

  const getDeactivatedLdapUsersInCurrentUserDomain = async () => {
    setUsers([]);

    if (isSaasUser !== false) {
      return;
    }

    const response = await ldapUserActions.getDeactivatedLdapUsers();
    setUsers([...DataParsingHelper.parseNestedArray(response, "data.data", [])]);
  };

  return ({
    users: users,
    setUsers: setUsers,
    error: error,
    loadData: () => loadData(getDeactivatedLdapUsersInCurrentUserDomain, handleErrorFunction),
    isLoading: isLoading,
  });
}
