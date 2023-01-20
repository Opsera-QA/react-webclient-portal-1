import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import accountsActions from "components/admin/accounts/accounts-actions";

export default function useGetLdapUsers() {
  const [isLoading, setIsLoading] = useState(false);
  const [ldapUsers, setLdapUsers] = useState([]);
  const [error, setError] = useState(undefined);
  const {
    getAccessToken,
    cancelTokenSource,
    toastContext,
    isSaasUser,
  } = useComponentStateReference();

  useEffect(() => {
    setLdapUsers([]);

    if (isSaasUser === false) {
      loadData().catch(() => {
      });
    }
  }, [isSaasUser]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(undefined);
      await getUsers();
    }
    catch (error) {
      setError(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const getUsers = async () => {
    let response = await accountsActions.getAccountUsersV2(getAccessToken, cancelTokenSource);
    const users = response?.data;

    if (Array.isArray(users)) {
      let formattedUsers = [];

      // TODO: Rework this
      users.map((user) => {
        formattedUsers.push({text: `${user.firstName} ${user.lastName} (${user.email})`, emailAddress: `${user?.email}`, value:`${user._id}`, user: user});
      });

      setLdapUsers(formattedUsers);
    }
  };

  return ({
    ldapUsers: ldapUsers,
    setLdapUsers: setLdapUsers,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
  });
}
